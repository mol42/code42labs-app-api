import Bottle from "bottlejs";

export default {
    initContext(diContext: any, initializers: Array<any>) {
        const bottle = new Bottle();

        for (let i = 0; i < initializers.length; i++) {
            initializers[i](bottle);
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
