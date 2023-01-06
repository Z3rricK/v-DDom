import render from "./render.js";

const zip = (xs, ys) => {
    const zipped = [];
    for (let i = 0; i < Math.max(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
};

const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = [];

    for (const [k, v] of Object.entries(newAttrs)) {
        patches.push($node => {
            $node.setAttribute(k, v);
            return $node;
        });
    }
}

const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];
    oldVChildren.forEach((oldVChild, i) => {
        childPatches.push(diff(oldVChild, newVChildren[i]));
    });

    const additionalPatches = [];
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(render(additionalVChild));
            return $node;
        });
    }

    return $parent => {
        for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
            patch(child);
        }

        return $parent;
    };
};

const diff = (vOldNode, vNewNode) => {
    if (vNewNode === undefined) {
        return $node => {
            $node.remove();
            return undefined;
        };
    }

    if (typeof vOldNode === "string" || typeof vNewNode === "string") {
        if (vOldNode !== vNewNode) {
            return $node => {
                const $newNode = render(vNewNode);
                $node.replaceWith($newNode);
                return $newNode;
            } else
            {
                return $node => undefined;
            };
        }
    }
}


