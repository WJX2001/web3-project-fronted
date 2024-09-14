import * as monaco from 'monaco-editor';
import  Editor, { loader, DiffEditor } from '@monaco-editor/react';

loader.config({ monaco });

export {
  Editor as CommonEditor,
  DiffEditor as CommonDiffEditor
};