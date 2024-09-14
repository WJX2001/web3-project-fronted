import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from 'react';
import styles from './index.module.less';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/theme/eclipse.css'; 
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/mode/sql/sql.js'; // 用于高亮sql语句
import 'codemirror/mode/shell/shell.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/javascript/javascript.js';
// 代码提示
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/hint/javascript-hint';
// 高亮行功能
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/selection-pointer';
// 折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';

// 搜索
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog.css';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const cm = require('codemirror/lib/codemirror.js');

interface SqlCodemirrorProps {
  style?: any;
  theme?: 'eclipse' | 'monokai' | 'lucario';
  text: string;
  readOnly?: boolean;
  tables?: any;
  datasourceType?: string | undefined;
  options?: any;
  closeHint?: boolean;
  onChange?: (editor: any, selection: string) => void;
  onLoadColumns?: (arg: any) => void;
  onBlur?: (arg: any) => void;
  onSaveInstance?: (editor: any) => void;
  onSelection?: (editor: any, selection: string, data: any) => void;
}
interface SqlCodemirrorRef {
  getText: () => any;
  setText: (v: any) => any;
  replaceSelection: (cm: any, v: any) => any;
  getSelection: (v: any) => any;
  getCursorLineData: (v: any) => any;
  getBeforeCursorLineData: (v: any) => any;
  getAfterCursorLineData: (v: any) => any;
}

// 数据库类型与codemirror的mode对应关系
const dataSourceTypeToModuleMap = new Map([
  [null, 'text/x-sql'],
  [undefined, 'text/x-sql'],
  ['undefined', 'text/x-sql'],
  ['ODPS', 'text/x-odps'],
  ['Oracle', 'text/x-plsql'],
  ['ADBForPG', 'text/x-pgsql'],
  ['Greenplum', 'text/x-pgsql'],
  ['Gauss200', 'text/x-pgsql'],
  ['MySQL', 'text/x-mysql'],
  ['ADBForMysql', 'text/x-mysql'],
  ['RDS', 'text/x-mysql'],
  ['DRDS', 'text/x-mysql'],
  ['SHELL', 'text/x-sh'],
  ['PYTHON', 'text/x-python'],
]);
const ApolloSqlCanvas = (props: any, ref: React.Ref<SqlCodemirrorRef>) => {
  const { text, closeHint, theme, options, style, datasourceType, tables, onChange, onLoadColumns, onSaveInstance, onBlur, onSelection, readOnly = false } = props;
  const mode = dataSourceTypeToModuleMap.get(datasourceType);
  // const [text, setText] = useState<string>('');
  const [tableKeys, setTableKeys] = useState<string[]>([]);
  const instance = useRef<any>(null);

  useEffect(() => {
    if (tables) {
      const keys = Object.keys(tables);
      setTableKeys(keys);
    }
  }, [tables]);

  useImperativeHandle(ref, () => ({
    getText: () => {
      return text;
    },
    setText: () => {
      // setText(v);
    },
    // 光标处设置值
    replaceSelection: (cm, v) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      cm && cm.replaceSelection(v);
    },
    // 获取选中数据
    getSelection: (cm) => {
      return cm && cm.doc.getSelection();
    },
    // 获取光标当前行数据
    getCursorLineData: (cm) => {
      const { doc } = cm;
      const cursor = doc?.getCursor();
      return doc && doc.getLine(cursor.line);
    },
    // 获取当前光标前数据
    getBeforeCursorLineData: (cm) => {
      const { doc } = cm;
      const cursor = doc?.getCursor();
      const token = cm.getTokenAt(cursor);
      const value = doc.getRange({ line: 0, ch: 0 }, { line: cursor.line, ch: token.end });

      return value;
    },
    // 获取当前光标所在行 及 以后的数据
    getAfterCursorLineData: (cm) => {
      const { doc } = cm;
      const cursor = doc?.getCursor();
      // 最后一行
      const lastLine = doc.lastLine();
      // 获取最后一行数据
      const lastLineData = doc.getLine(lastLine) || '';
      // const token = cm.getTokenAt(cursor);
      const value = doc.getRange({ line: cursor.line, ch: 0 }, { line: lastLine, ch: lastLineData.length || 0 });

      return value;
    },
    /**
     * 获取当前光标最近的二个分号之间的sql
     * @param {object} cm
     * @return {string}
     */
    getBetweenCursorByRecentSemicolonLineData: (cm: any) => {
      const { doc } = cm;
      const cursor = doc?.getCursor();
      // 第一行
      const firstLine = doc.firstLine();
      // 获取光标位置之前所有的数据
      const beforeCursorLineData = doc.getRange({ line: firstLine, ch: 0 }, { line: cursor.line, ch: cursor.ch });
      // 最后一行
      const lastLine = doc.lastLine();
      // 获取最后一行数据
      const lastLineData = doc.getLine(lastLine) || '';
      // 获取光标位置之后所有的数据
      const afterCursorLineData = doc.getRange(
        { line: cursor.line, ch: cursor.ch },
        { line: lastLine, ch: lastLineData.length || 0 },
      );
      const beforeCursorLineDataArr = beforeCursorLineData.split(';');
      const afterCursorLineDataArr = afterCursorLineData.split(';');
      // 光标前是否有分号
      const hasSemicolonInBeforeLineData = beforeCursorLineData.indexOf(';') !== -1;
      // 光标后是否有分号
      const hasSemicolonInAfterLineData = afterCursorLineData.indexOf(';') !== -1;
      // 光标前最后一个分号前的数据
      const selectedBeforeCursorLineData = beforeCursorLineDataArr[beforeCursorLineDataArr.length - 1];
      // 光标后第一个分号前的数据
      const selectedAfterCursorLineData = afterCursorLineDataArr[0];
      if (
        (hasSemicolonInBeforeLineData && hasSemicolonInAfterLineData) ||
        (!hasSemicolonInBeforeLineData && !hasSemicolonInAfterLineData)
      ) {
        return `${selectedBeforeCursorLineData}${selectedAfterCursorLineData}`;
      } else if (!hasSemicolonInBeforeLineData && hasSemicolonInAfterLineData) {
        // 如果光标处于内容起始处，即beforeCursorLineData为空
        if (beforeCursorLineData.trim() === '') {
          if (afterCursorLineData.startsWith(';')) {
            return afterCursorLineDataArr[1];
          } else {
            return `${selectedAfterCursorLineData}`;
          }
        } else {
          return `${selectedBeforeCursorLineData}${selectedAfterCursorLineData}`;
        }
        // return `${selectedAfterCursorLineData}`;
      } else if (hasSemicolonInBeforeLineData && !hasSemicolonInAfterLineData) {
        // 如果光标处于内容末尾，即afterCursorLineData为空
        if (afterCursorLineData.trim() === '') {
          if (beforeCursorLineData.endsWith(';')) {
            return beforeCursorLineDataArr[beforeCursorLineDataArr.length - 2];
          } else {
            return `${selectedBeforeCursorLineData}`;
          }
        } else {
          return `${selectedBeforeCursorLineData}${selectedAfterCursorLineData}`;
        }
      }
      return '';
    },
  }));

  const autoComplete = (editor: any, event: any) => {
    const { key, keyCode } = event;
    // 上下方向键选择hint 直接返回 解决选中不了问题
    if (key === 'ArrowDown' || key === 'ArrowUp') return;
    const inputVal = editor.getValue().toLowerCase();

    // 对codemirror关键词提示的优化
    if (key && keyCode !== 13 && key !== ' ' && key !== ';' && keyCode !== 8 && !editor.getOption('readOnly')) {
      editor.showHint();
    }

    const fined = tableKeys.find((o) => inputVal.includes(o.toLowerCase()));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    fined && !tables[fined]?.length && onLoadColumns && onLoadColumns(fined);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleHintShow = (cmInstance: any, options: any) => {
    let mode = cmInstance.doc.modeOption;
    if (mode === 'sql') mode = 'text/x-sql';
    // const editor = cmInstance.getDoc().getEditor();
    const { keywords } = cm.resolveMode(mode);
    const keys = Object.keys(keywords);

    const cursor = cmInstance.getCursor();
    // const cursorLine = cmInstance.getLine(cursor.line);
    // const end = cursor.ch;
    // const start = end;

    const token = cmInstance.getTokenAt(cursor);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: ['hello', 'world', ...keys],
          from: { ch: token.start, line: cursor.line },
          to: { ch: token.end, line: cursor.line },
        });
      }, 300);
    });
  };

  // 获取选中数据
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getSelection = () => {
    return instance.current.doc.getSelection();
  };

  // 获取光标当前行数据
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCursorLineData = () => {
    const { doc } = instance.current;
    const cursor = doc.getCursor();
    return doc.getLine(cursor.line);
  };

  return (
    <div className={styles['common-codemirror-container']} style={style}>
      <CodeMirror
        value={text}
        onChange={(editor, data, v) => {
          onChange && onChange(editor, v);
        }}
        onBlur={(editor: any, event: any) => {
          onBlur && onBlur(editor, event);
        }}
        onKeyUp={(editor: any, event: any) => {
          !closeHint && autoComplete(editor, event);
        }}
        editorDidMount={(editor) => {
          // 保存每一个实例 用于父组件 getSelection getCursorLineData
          onSaveInstance && onSaveInstance(editor);
          instance.current = editor;
        }}
        onCursorActivity={(editor) => {
          onSelection && onSelection(editor, editor.doc.getSelection(), editor.doc.getCursor());
        }}
        options={{
          readOnly,
          mode, // 代码类型
          theme: theme || 'monokai', // 主题
          indentWithTabs: true, // 在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false 。
          smartIndent: true, // 自动缩进,回车时跟上一行保持相同缩进
          lineNumbers: true, // 左侧显示行数
          matchBrackets: true, // 括号匹配
          cursorHeight: 1, // 光标高度
          lineWrapping: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autoRefresh: true,
          line: true,
          placeholder: props.placeholder || '请输入',
          hintOptions: {
            // 自定义提示选项
            completeSingle: false, // 当匹配只有一项的时候是否自动补全，建议false
            // hint: handleHintShow,
            // async: true,
            // disableKeywords: ['hello'],
            tables,
          },
          extraKeys: {
            // 触发按键
            Ctrl: 'autocomplete',
            "Alt-F": "findPersistent",
            // 'Ctrl-F': (editor) => {
            //   console.log(editor)
            //   editor.execCommand('find');
            // },
          },
          ...options
        }}
      />
    </div>
  );
};

export default forwardRef<SqlCodemirrorRef, SqlCodemirrorProps>(ApolloSqlCanvas);
