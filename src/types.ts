export interface WorkflowAction {
  id: string;
  type: 'click' | 'type' | 'wait' | 'press' | 'open' | 'capture';
  params: {
    x?: number;
    y?: number;
    text?: string;
    key?: string;
    appName?: string;
    duration?: number;
  };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: 'Automation' | 'DevOps' | 'Mobile' | 'System';
  actions: WorkflowAction[];
}

export interface ADBDevice {
  id: string;
  model: string;
  status: 'connected' | 'unauthorized' | 'disconnected';
  type: 'usb' | 'wifi';
  battery: number;
  temp: string;
  os: string;
}

export interface CouncilMessage {
  agent: 'Planner' | 'Researcher' | 'Designer' | 'Coder' | 'Tester';
  message: string;
}

export interface CouncilResponse {
  discussion: CouncilMessage[];
  conclusion: string;
}
