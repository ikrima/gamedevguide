// optional `menuName` overrides default name for menu item if it's defined
// hideInMenu hides item in menu

export const CARDS = [
  {
    name: 'Card - Image Cards',
    menuName: 'Image Cards',
    desc: 'Card component for displaying image and related content',
    path: '/app/card/image-cards'
  },
  {
    name: 'Card - Form Cards',
    menuName: 'Form Cards',
    desc: 'Card component for displaying form content',
    path: '/app/card/form-cards'
  },
  {
    name: 'Card - Blog Cards (Grid)',
    menuName: 'Blog Cards (Grid)',
    desc: 'Card component for displaying blog content',
    path: '/app/card/blog-cards-grid'
  },
  {
    name: 'Card - Blog Cards (List)',
    menuName: 'Blog Cards (List)',
    desc: 'Card component for displaying blog content',
    path: '/app/card/blog-cards-list'
  },
  {
    name: 'Card - Number Cards',
    menuName: 'Number Cards',
    desc: 'Card component for displaying number and related content',
    path: '/app/card/number-cards'
  },
  {
    name: 'Card - Profile Cards',
    menuName: 'Profile Cards',
    desc: 'Card component for displaying profile content',
    path: '/app/card/profile-cards'
  },
  {
    name: 'Card - Simple Card',
    menuName: 'Simple Cards',
    desc: 'A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.',
    path: '/app/card/cards'
  },
  {
    name: 'Card - Icon Cards',
    menuName: 'Icon Cards',
    desc: 'Card component for displaying Icon and related content',
    path: '/app/card/icon-cards'
  },
  {
    name: 'Card - Product Cards (Grid)',
    menuName: 'Product Cards (Grid)',
    desc: 'Card component for displaying products',
    path: '/app/card/product-cards-grid'
  },
  {
    name: 'Card - Product Cards (List)',
    menuName: 'Product Cards (List)',
    desc: 'Card component for displaying products',
    path: '/app/card/product-cards-list'
  },
  {
    name: 'Card - Portfolio Cards',
    menuName: 'Portfolio Cards',
    desc: 'Card component for displaying portfolio',
    path: '/app/card/portfolio-cards'
  },
]

export const LAYOUTS = [
  {
    name: 'Layout - Header',
    menuName: 'Header',
    desc: 'The header section of App layout',
    path: '/app/layout/header'
  },
  {
    name: 'Layout - Footer',
    menuName: 'Footer',
    desc: 'The footer section of App layout',
    path: '/app/layout/footer'
  },
  {
    name: 'Layout - Sidenav',
    menuName: 'Sidenav',
    desc: 'The sidenav section of App layout',
    path: '/app/layout/sidenav'
  },
  {
    name: 'Layout - Page / Content',
    menuName: 'Page / Content',
    desc: 'The content / page section of App layout',
    path: '/app/layout/page'
  },
  {
    name: 'Layout - Page (Fullscreen)',
    menuName: 'Page (Fullscreen)',
    desc: 'A fullscreen page, without App header, footer or sidenav',
    path: '/app/layout/page-fullscreen'
  }, 
  {
    name: 'Layout - Page with Tabs',
    menuName: 'Page (with Tabs)',
    desc: 'A standard page with tabs for different views',
    path: '/app/layout/page-with-tabs'
  },
  {
    name: 'Layout - Page with Breadcrumb',
    menuName: 'Page (with Breadcrumb)',
    desc: 'A standard page with breadcrumb',
    path: '/app/layout/page-with-breadcrumb'
  },
  {
    name: 'Layout - Grid System',
    menuName: 'Grid System',
    desc: "Bootstrap's powerful mobile-first flexbox grid to build layouts of all shapes and sizes",
    path: '/app/layout/grid'
  },
  {
    name: 'List / List Group',
    menuName: 'List',
    desc: 'A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.',
    path: '/app/layout/list'
  },
]

const UIHOVER = [
  {
    name: 'Hover',
    menuName: 'Basic',
    desc: 'A mouse hover, also called just hover, triggers an event when a user places a mouse over a designated area',
    path: '/app/ui/hover/hover'
  }, {
    name: 'Hover - Link Hover',
    menuName: 'Link Hover',
    desc: 'Link hover effect is triggered when a user places a mouse over a link',
    path: '/app/ui/hover/link-hover'
  }, {
    name: 'Hover - With Overlay',
    menuName: 'With Overlay',
    desc: 'Overlay content is displayed when a user places a mouse over a designated area',
    path: '/app/ui/hover/with-overlay'
  },
]

const UIICON = [
  {
    name: 'Icon - Ant Icons',
    menuName: 'Ant Icons',
    desc: 'Antd icon assets',
    path: '/app/ui/icon/ant-icons'
  },
  {
    name: 'Icon - Social Icons',
    menuName: 'Social Icons',
    desc: 'Social icon assets',
    path: '/app/ui/icon/social-icons'
  }
]

const UIMORE = [
  {
    name: 'Avatar',
    desc: 'Avatars can be used to represent people or objects. It supports images, Icons, or letters.',
    path: '/app/ui/more/avatar'
  },
  {
    name: 'BackTop',
    desc: 'BackTop makes it easy to go back to the top of the page.',
    path: '/app/ui/more/back-top',
    hideInMenu: true
  },
  {
    name: 'Badge / Label',
    desc: 'Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.',
    path: '/app/ui/more/badge'
  },
  {
    name: 'Call to Action',
    desc: 'A call to action (CTA) is an instruction to the audience designed to provoke an immediate response.',
    path: '/app/ui/more/call-to-action'
  },
  {
    name: 'Callout',
    desc: 'A callout is often a short piece of text set in larger type or with colorful background and intended to attract attention.',
    path: '/app/ui/more/callout'
  },
  {
    name: 'Carousel',
    desc: 'A carousel component. Scales with its container.',
    path: '/app/ui/more/carousel'
  },
  {
    name: 'Popover',
    desc: 'The floating card popped by clicking or hovering.',
    path: '/app/ui/more/popover'
  },
  {
    name: 'Ribbon',
    desc: 'A ribbon is used primarily as decorative binding for highlighting a piece of information.',
    path: '/app/ui/more/ribbon'
  },
  {
    name: 'Tag / Chip',
    desc: 'Tag for categorizing or markup.',
    path: '/app/ui/more/tag'
  },
  {
    name: 'Tooltip',
    desc: 'A simple text popup tip.',
    path: '/app/ui/more/tooltip'
  },
  {
    name: 'Tree',
    desc: 'Almost anything can be represented in a tree structure. Examples include directories, organization hierarchies, biological classifications, countries, etc.',
    path: '/app/ui/more/tree'
  },
]

const UINAVIGATION = [
  {
    name: 'Breadcrumb',
    desc: 'A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.',
    path: '/app/ui/navigation/breadcrumb'
  },
  {
    name: 'Dropdown',
    desc: 'A dropdown list. If there are too many operations to display, you can wrap them in a Dropdown.',
    path: '/app/ui/navigation/dropdown'
  },
  {
    name: 'Pagination',
    desc: 'When it will take a long time to load/render all items. Or if you want to browse the data by navigating through pages.',
    path: '/app/ui/navigation/pagination'
  },
]

export const UITIMELINE = [
  {
    name: 'Timeline / Streamline',
    desc: 'Vertical display timeline.',
    path: '/app/ui/timeline/timeline'
  },
  {
    name: 'Timeline (Large)',
    desc: 'Large vertical display timeline.',
    path: '/app/ui/timeline/timeline-lg'
  },
]

const UITYPOGRAPHY = [
  {
    name: 'Blockquote',
    desc: 'Blockquote specifies a section that is quoted from another source.',
    path: '/app/ui/typography/blockquote'
  },
  {
    name: 'Typography',
    desc: 'Typography is one of the most basic foundational part of a interface design system.',
    path: '/app/ui/typography/typography'
  },
]

const UIUTILITY = [
  {
    name: 'Overlay',
    desc: "Overlays are often used when you want to make the content on top of an image more readable. It's used on components like Image Cards, Covers, Hero etc.",
    path: '/app/ui/utility/overlay'
  },
  {
    name: 'Background Color',
    desc: 'Convey meaning through color with a handful of color utility classes.',
    path: '/app/ui/utility/color'
  },
  {
    name: 'Spacing',
    desc: 'A wide range of shorthand responsive margin and padding utility classes to modify an element’s appearance.',
    path: '/app/ui/utility/spacing'
  },
  {
    name: 'Gradient Backgrounds',
    desc: 'Convey meaning through color with a handful of color utility classes.',
    path: '/app/ui/utility/gradient-background'
  },
  {
    name: 'Divider',
    desc: 'A divider line separates different content.',
    path: '/app/ui/utility/divider'
  },
]

export const UIKIT = [
  {
    name: 'Button / Button Group',
    menuName: 'Button',
    desc: 'A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.',
    path: '/app/ui/button'
  },
  {
    name: 'Box',
    desc: 'A box is often used as a container to display content, it works like a Card.',
    path: '/app/ui/box'
  },
  {
    name: 'Color Palette',
    desc: 'Color palette of Ant Design',
    path: '/app/ui/color-palette'
  },
  {
    name: 'Collapse / Accordion',
    desc: 'A content area which can be collapsed and expanded.',
    path: '/app/ui/collapse'
  },
  {
    name: 'Cover',
    desc: 'A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site.',
    path: '/app/ui/cover'
  },
  {
    name: 'Feature Callout',
    desc: 'A callout for feature',
    path: '/app/ui/feature-callout'
  },
  {
    name: 'Hover',
    path: '/app/ui/hover',
    children: UIHOVER
  },
  {
    name: 'Icon',
    path: '/app/ui/icon',
    children: UIICON
  },
  {
    name: 'Jumbotron / Hero',
    desc: 'A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site.',
    path: '/app/ui/jumbotron'
  },
  {
    name: 'More Components',
    path: '/app/ui/more',
    children: UIMORE
  },
  {
    name: 'Navigation',
    path: '/app/ui/navigation',
    children: UINAVIGATION
  },
  {
    name: 'Pricing Tables',
    desc: 'A table shows the pricing and corresponding features',
    path: '/app/ui/pricing-table'
  },  {
    name: 'Sash',
    desc: 'A sash is a large and usually colorful ribbon or band of material positioned around the content body',
    path: '/app/ui/sash'
  }, {
    name: 'Tabs',
    desc: 'Tabs make it easy to switch between different views.',
    path: '/app/ui/tabs'
  },  {
    name: 'Testimonial',
    desc: "A testimonial consists of a person's written or spoken statement extolling the virtue of a product.",
    path: '/app/ui/testimonials'
  },   
  {
    name: 'Timeline',
    path: '/app/ui/timeline',
    children: UITIMELINE
  },
  {
    name: 'Typography',
    path: '/app/ui/typography',
    children: UITYPOGRAPHY
  },
  {
    name: 'Utility',
    path: '/app/ui/utility',
    children: UIUTILITY
  },
];

const FORMCONTROLS = [
  {
    name: 'Rate',
    desc: 'Rate component. Usage: Show evaluation. Or a quick rating operation on something.',
    path: '/app/form/form-control/rate'
  },
  {
    name: 'Slider',
    desc: 'A Slider component for displaying current value and intervals in range.',
    path: '/app/form/form-control/slider'
  },
  {
    name: 'Switch',
    desc: 'Switching Selector. Usage: If you need to represent the switching between two states or on-off state.',
    path: '/app/form/form-control/switch'
  },
  {
    name: 'TimePicker',
    desc: 'By clicking the input box, you can select a time from a popup panel.',
    path: '/app/form/form-control/timepicker'
  },
  {
    name: 'Transfer',
    desc: 'Double column transfer choice box.',
    path: '/app/form/form-control/transfer'
  },
  {
    name: 'Tree Select',
    desc: 'Tree Select is similar to Select, but the values are provided in a tree like structure.',
    path: '/app/form/form-control/tree-select'
  },
  {
    name: 'Upload',
    desc: 'Upload file by selecting or dragging.',
    path: '/app/form/form-control/upload'
  },
  {
    name: 'Select & Tags',
    desc: 'Select component to select value from options.',
    path: '/app/form/form-control/select'
  },
  {
    name: 'Radio',
    desc: 'Radio. Usage: Used to select a single state in multiple options.',
    path: '/app/form/form-control/radio'
  },
  {
    name: 'Mention',
    desc: 'Mention component. Usage: When need to mention someone or something.',
    path: '/app/form/form-control/mention'
  },
  {
    name: 'Input Number',
    desc: 'Enter a number within certain range with the mouse or keyboard.',
    path: '/app/form/form-control/input-number'
  },
  {
    name: 'Input / Form',
    desc: 'A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.',
    path: '/app/form/form-control/input'
  },
  {
    name: 'DatePicker',
    desc: 'By clicking the input box, you can select a date from a popup calendar.',
    path: '/app/form/form-control/datepicker'
  },
  {
    name: 'AutoComplete',
    desc: 'Autocomplete function of input field. Usage: When there is a need for autocomplete functionality.',
    path: '/app/form/form-control/autocomplete'
  },
  {
    name: 'Cascader',
    desc: 'Cascade selection box.',
    path: '/app/form/form-control/cascader'
  },
  {
    name: 'Checkbox',
    desc: 'Checkbox. Used for selecting multiple values from several options.',
    path: '/app/form/form-control/checkbox'
  },
]

export const FORMS = [
  {
    name: 'Form Examples',
    desc: 'Form is used to collect, validate, and submit the user input, usually contains various form items including checkbox, radio, input, select, and etc.',
    path: '/app/form/forms'
  },
  {
    name: 'Form Layout',
    desc: 'Different layout type for forms',
    path: '/app/form/layout'
  },
  {
    name: 'Form Control',
    path: '/app/form/form-control',
    badge: 'badge-status-dot badge-info',
    children: FORMCONTROLS
  },
  {
    name: 'Form Validation',
    desc: "Validate status and/or message will be displayed when user's input violate specified validation rules",
    path: '/app/form/validation'
  },
  {
    name: 'Steps / Wizard',
    desc: 'Steps is a navigation bar that guides users through the steps of a task.',
    path: '/app/form/steps'
  }
]

export const FEEDBACKS = [
  {
    name: 'Modal / Dialog',
    desc: "Modal dialogs. Usage: When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow",
    path: '/app/feedback/modal'
  },
  {
    name: 'Notification',
    desc: 'Display a notification message globally.',
    path: '/app/feedback/notification'
  },
  {
    name: 'Alert',
    desc: 'Alert component for feedback. Usage: When you need to show alert messages to users.',
    path: '/app/feedback/alert'
  },
  {
    name: 'Message / Snackbar',
    desc: 'Display global messages as feedback in response to user operations.',
    path: '/app/feedback/message'
  },
  {
    name: 'Popconfirm',
    desc: 'A simple and compact confirmation dialog of an action.',
    path: '/app/feedback/popconfirm'
  },
  {
    name: 'Progress',
    desc: 'Display the current progress of an operation flow.',
    path: '/app/feedback/progress'
  },
  {
    name: 'Spin',
    desc: 'A spinner for displaying loading state of a page or a section.',
    path: '/app/feedback/spin'
  },
  {
    name: 'Loader',
    desc: 'A loader for displaying loading state of a page or a section.',
    path: '/app/feedback/loader'
  },
]

export const TABELS = [
  {
    name: 'Table - Tables',
    menuName: 'Table Examples',
    desc: 'A table displays rows of data.',
    path: '/app/table/tables'
  }, {
    name: 'Table - Data Table',
    menuName: 'Data Table',
    desc: 'Usage: to display a collection of structured data and to sort, search, paginate, filter data.',
    path: '/app/table/data-table'
  },
]

export const CHARTS = [
  {
    name: 'Chart - Line & Area',
    menuName: 'Line & Area',
    desc: 'Line & Area chart',
    path: '/app/chart/line'
  },
  {
    name: 'Chart - Bar',
    menuName: 'Bar',
    desc: 'Bar chart',
    path: '/app/chart/bar'
  },
  {
    name: 'Chart - Pie',
    menuName: 'Pie',
    desc: 'Pie chart',
    path: '/app/chart/pie'
  },
  {
    name: 'Chart - Scatter',
    menuName: 'Scatter',
    desc: 'Scatter chart',
    path: '/app/chart/scatter'
  },
  {
    name: 'Chart - Radar',
    menuName: 'Radar',
    desc: 'Radar chart',
    path: '/app/chart/radar'
  },
  {
    name: 'Chart - Funnel',
    menuName: 'Funnel',
    desc: 'Funnel chart',
    path: '/app/chart/funnel'
  },
  {
    name: 'Chart - Gauge',
    menuName: 'Gauge',
    desc: 'Gauge chart',
    path: '/app/chart/gauge'
  },
  {
    name: 'Chart - Candlestick',
    menuName: 'Candlestick',
    desc: 'Candlestick chart',
    path: '/app/chart/candlestick'
  },
  {
    name: 'Chart - Heatmap',
    menuName: 'Heatmap',
    desc: 'Heatmap chart',
    path: '/app/chart/heatmap'
  },
  {
    name: 'Chart - PictorialBar',
    menuName: 'PictorialBar',
    desc: 'PictorialBar chart',
    path: '/app/chart/pictorial-bar'
  },
  {
    name: 'Chart - Sunburst',
    menuName: 'Sunburst',
    desc: 'Sunburst chart',
    path: '/app/chart/sunburst'
  },
  {
    name: 'Chart - ThemeRiver',
    menuName: 'ThemeRiver',
    desc: 'ThemeRiver chart',
    path: '/app/chart/theme-river'
  },
]

const CALENDAR = [
  {
    name: 'Calendar',
    desc: 'When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.',
    path: '/app/calendar'
  }
]


export const PAGES = [
  {
    name: 'About',
    path: '/app/page/about'
  }, {
    name: 'About History',
    path: '/app/page/about-history'
  }, {
    name: 'Blog',
    path: '/app/page/blog'
  }, {
    name: 'Services',
    path: '/app/page/services'
  }, {
    name: 'Services v2',
    path: '/app/page/services-v2'
  }, {
    name: 'Careers',
    path: '/app/page/careers'
  }, {
    name: 'Contact',
    path: '/app/page/contact'
  }, {
    name: 'FAQs',
    path: '/app/page/faqs'
  }, {
    name: 'Terms of Services',
    path: '/app/page/terms'
  },
]

export const ECOMMERCE = [
  {
    name: 'Products',
    path: '/app/ecommerce/products'
  }, {
    name: 'Products v2',
    path: '/app/ecommerce/products-v2'
  }, {
    name: 'Invoice',
    path: '/app/ecommerce/invoice'
  }
]

export const USER = [
  {
    name: 'Login',
    path: '/user/login'
  }, {
    name: 'Login v2',
    path: '/user/login-v2'
  }, {
    name: 'Sign Up',
    path: '/user/sign-up'
  }, {
    name: 'Sign Up v2',
    path: '/user/sign-up-v2'
  }, {
    name: 'Forgot Password',
    path: '/user/forgot-password'
  }, {
    name: 'Forgot Password v2',
    path: '/user/forgot-password-v2'
  }
]

export const EXCEPTION = [
  {
    name: '403 Error',
    path: '/app/exception/403'
  }, {
    name: '403 Error (Fullscreen)',
    path: '/exception/403'
  }, {
    name: '404 Error',
    path: '/app/exception/404'
  }, {
    name: '404 Error (Fullscreen)',
    path: '/exception/404'
  }, {
    name: '500 Error',
    path: '/app/exception/500'
  }, {
    name: '500 Error (Fullscreen)',
    path: '/exception/500'
  }, 
]


// for UI Overview page
const COMPONENTS = [
  ...CARDS,
  ...LAYOUTS,
  ...UIKIT, ...UIHOVER, ...UIICON, ...UIMORE, ...UINAVIGATION, ...UITIMELINE, ...UITYPOGRAPHY, ...UIUTILITY,
  ...FORMS, ...FORMCONTROLS,
  ...FEEDBACKS,
  ...TABELS,
  ...CHARTS,
  ...CALENDAR
];

export default COMPONENTS;

