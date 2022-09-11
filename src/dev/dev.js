import eruda from "./eruda/eruda.js";
import erudaFps from "./eruda-fps/eruda-fps.js";
import erudaFeatures from "./eruda-features/eruda-features.js";
import erudaTiming from "./eruda-timing/eruda-timing.js";
import erudaMemory from "./eruda-memory/eruda-memory.js";
import erudaCode from "./eruda-code/eruda-code.js";
import erudaBenchmark from "./eruda-benchmark/eruda-benchmark.js";
import erudaGeolocation from "./eruda-geolocation/eruda-geolocation.js";
import erudaDom from "./eruda-dom/eruda-dom.js";
import erudaOrientation from "./eruda-orientation/eruda-orientation.js";
import erudaTouches from "./eruda-touches/eruda-touches.js";

eruda.init({
	defaults: {
		displaySize: 50
	}
});

eruda.add(erudaFps);
eruda.add(erudaFeatures);
eruda.add(erudaTiming);
eruda.add(erudaMemory);
eruda.add(erudaCode);
eruda.add(erudaBenchmark);
eruda.add(erudaGeolocation);
eruda.add(erudaDom);
eruda.add(erudaOrientation);
eruda.add(erudaTouches);
