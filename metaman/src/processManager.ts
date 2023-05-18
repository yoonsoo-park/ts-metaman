import ACollector from './Data/ACollector';
import AAction from './Logic/AAction';
import AVisualizer from './Pesentation/AVisualizer';

export default class ProcessManager {
	presenter: AVisualizer;
	action: AAction;
	collector: ACollector;
	constructor(collector: ACollector, action: AAction, presenter: AVisualizer) {
		this.collector = collector;
		this.action = action;
		this.presenter = presenter;
	}
}
