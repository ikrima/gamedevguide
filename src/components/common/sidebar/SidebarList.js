import React from "react";
import PropTypes from "prop-types";

import SidebarLink from "./SidebarLink";

const SidebarList = ({ items, location, subgroups }) => {
    const linkClasses = `midgrey fw4 hover-blue-l2`;
    const activeLinkClasses = `sidebarlink-active blue fw6`;

    return (
        <ul className="relative sidebar-list ma0 pa0 list mb5 pl6 mt1">
            {items.map((item, j) => (
                <>
                    {item.subitems ? (
                        <li key={j}>
                            <SidebarLink
                                link={item.subitems[0].link}
                                title={item.title}
                                linkClasses={
                                    item.link === location.pathname
                                        ? activeLinkClasses
                                        : linkClasses
                                }
                            />
                        </li>
                    ) : (
                        <>
                            {" "}
                            <li key={j}>
                                <SidebarLink
                                    link={item.link}
                                    title={item.title}
                                    linkClasses={
                                        item.link === location.pathname
                                            ? activeLinkClasses
                                            : linkClasses
                                    }
                                />
                            </li>
                        </>
                    )}

                    {item.subitems ? (
                        item.subitems.map(subitem => {
                            return (
                                <>
                                    <ul>
                                        <li key={j}>
                                            <SidebarLink
                                                link={subitem.link}
                                                title={subitem.title}
                                                linkClasses={
                                                    subitem.link ===
                                                    location.pathname
                                                        ? activeLinkClasses
                                                        : linkClasses
                                                }
                                            />
                                        </li>
                                    </ul>
                                </>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </>
            ))}
        </ul>
    );
};

SidebarList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default SidebarList;
