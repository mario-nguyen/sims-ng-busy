"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUSY_CONFIG_DEFAULTS = {
    template: "<div class=\"sims-busy-square-spinner\"></div>",
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: '',
    wrapperClass: 'sims-busy'
};
var BusyConfig = (function () {
    function BusyConfig(config) {
        if (config === void 0) { config = {}; }
        for (var option in exports.BUSY_CONFIG_DEFAULTS) {
            if (config[option] != null) {
                this[option] = config[option];
            }
            else {
                this[option] = exports.BUSY_CONFIG_DEFAULTS[option];
            }
        }
    }
    return BusyConfig;
}());
exports.BusyConfig = BusyConfig;
//# sourceMappingURL=busy-config.js.map