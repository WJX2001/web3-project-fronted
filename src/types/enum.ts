
// 错误处理方案： 错误类型
export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

export enum FormItemType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  PASSWORD = 'password',
  INPUTNUMBER = 'inputNumber',
  INPUTNUMBER_RANGE = 'inputNumberRange',
  SELECT = 'select',
  DATEPICKER = 'datePicker',
  DATETIMEPICKER = 'dateTimePicker',
  RANGEPICKER = 'rangePicker',
  TIMERANGEPICKER = 'timeRangePicker',
  RADIOGROUP = 'RadioGroup',
  DEPENDENCY = 'Dependency',
  FORMLIST = 'formList',
  TREESELECT = 'treeSelect',
  CASCADER = 'cascader',
  CHECKBOX = 'checkbox',
  CHECKBOXGROUP = 'checkboxGroup',
  UPLOADBUTTON = 'uploadButton',
  SWITCH = 'switch',
  CUSTOM = 'custom',
  AUTOCOMPLETE = 'autocomplete',
  TIMEPICKER='timePicker',
}

export enum FormItemWidth {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export enum OptMode {
  EDIT = 'edit',
  VIEW = 'view',
  ADD = 'add',
  DEFAULT = ':id',
}

// 发布订阅事件集合枚举
export enum EVENTBUS_NAME {
  // sql脚本化模块 - sql画布内容发生变化
  SQL_CHANGE,
  // sql脚本化模块 - 输入输出表发生变化
  SQL_TABLE_CHANGE,
  // 工作流模块 - 点击任务节点进行属性设置
  WORKFLOW_SETTING_TASK_ATTR,
  // 工作流模块 - 当任务和工作流列表数据更新时，通知左侧可拖拽任务列表更新是否可拖拽标志
  WORKFLOW_JOBLIST_UPDATE,
  // 工作流模块 - 当子工作流配置属性模块更新时，通知FlowMain模块更新数据
  WORKFLOW_SUBFLOW_UPDATE,
  // 工作流模块 - 点击主工作流节点进行属性设置
  WORKFLOW_SETTING_WORKFLOW_ATTR,
  // 修改工作流split-pane的大小
  WORKFLOW_SPLITPANE_CHANGE,
  // 返回上级
  WORKFLOW_BACK,
  // 批量集成，根据选中的任务清单渲染字段映射列表
  BATCHINTEGRATION_FIELDMAPPING_UPDATE,
  // 批量集成，字段映射列表有更新
  BATCHINTEGRATION_FIELDMAPPING_CHANGE,
  // 批量集成，修改样式尺寸
  BATCHINTEGRATION_FIELDSIZE_CHANGE,
  // 批量集成，通知任务设置模块
  BATCHINTEGRATION_TASKCONF_UPDATE,
  // 批量集成，当切换任务的时候将当前的校验状态传过来
  BATCHINTEGRATION_VALIDATE_STATUS,
  // 批量集成，编辑的时候将接口的数据拿到后触发回来
  BATCHINTEGRATION_EDIT_DATASOUCE,
  // 批量集成，编辑的时候触发校验逻辑并保存当前任务的校验结果
  BATCHINTEGRATION_TASKVALID_RES,
  // 批量集成，新建SQL集成任务调用触发映射逻辑
  BATCHINTEGRATION_NEW_SQL_INTEGRATION_TASK,
  // 批量集成，校验逻辑配置信息部分
  BATCHINTEGRATION_VALIDATE_FORM,
  // 批量集成，校验逻辑映射关系部分
  BATCHINTEGRATION_VALIDATE_TABLE,
  // 批量集成，编辑SQL集成任务
  BATCHINTEGRATION_EDIT_SQL_TASK,

}

// 工作流当前展示的数据类型，是工作流信息还是任务还是其他的
export enum WORKFLOW_ATTR_SHOW_TYPE {
  FLOW = 'flow',
  TASK = 'task',
  SUBFLOW = 'subFlow',
  OTHER = 'other',
}

// 集成链路-数据源类型
export enum IntegratedLinkServerType {
  LOGIC = 'logic',
  PHYSICS = 'physics',
}

export enum Code {
  SUCCESS = 'OK',
  SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  FAIL = 'FAIL',
}

export enum AddTypeEnum {
  FLOW = '1',
  BATCH = '2',
  QINGFEN = '3',
  SCRIPT = '4',
  SQL = '5',
  VIRTUAL = '6',
  DISPATCH = '7',
  PARAM = '8',
  TESTTASK = '9',
}
