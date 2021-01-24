import Bottle from "bottlejs";

export default {
    initContext(diContext: any, initers: Array<any>) {
        const bottle = new Bottle();

        for (let i = 0; i < initers.length; i++) {
            initers[i](bottle);
        }

        diContext.bottle = bottle;
        diContext.container = bottle.container;
    },

    createContext() {
        return {
            bottle: null,
            container: null
        };
    }
};
