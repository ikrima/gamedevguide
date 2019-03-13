export const getSidebarState = store => store.layout.sidebar;

// header
export const getHeaderHeightState = store => store.layout.header.height;

// anchor
export const getAnchorState = store => store.layout.anchor;

// sidebar
export const getSidebarDockedState = store => store.layout.sidebar.docked;
export const getSidebarExpandedKey = store => store.layout.sidebar.expandedKey;

// content
export const getContentOnPostPageState = store => store.layout.content.onPostPage;