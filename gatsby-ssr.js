/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import { cloneDeepWith } from "lodash";

// cleanup html before render
export function onPreRenderHTML({ getHeadComponents, replaceHeadComponents }) {
    const headComponents = getHeadComponents();
    replaceHeadComponents(omitDeep(headComponents, ["data-react-helmet"]));
}

/**
 * remove properties from collection deep
 * @param collection
 * @param excludeKeys
 * @returns {any}
 */
const omitDeep = (collection, excludeKeys) =>
    cloneDeepWith(collection, value => {
        if (value && typeof value === "object") {
            for (const key of excludeKeys) {
                try {
                    delete value[key];
                } catch (_) {
                    // console.log("ignore", _);
                }
            }
        }
    });