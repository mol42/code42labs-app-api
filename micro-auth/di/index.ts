import DiHelper from "../../common-lib/di/di-helper";

export const diContext = {
    bottle: null,
    container: null
};

export function initializeDI() {
    const initializers = [];
    DiHelper.initContext(diContext, initializers);
}
