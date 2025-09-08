// Dark mode utility classes and functions

// Common dark mode class combinations
export const darkModeStyles = {
  // Backgrounds
  background: {
    primary: 'bg-white dark:bg-gray-900',
    secondary: 'bg-gray-50 dark:bg-gray-800',
    card: 'bg-white dark:bg-gray-800',
    overlay: 'bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70',
    sidebar: 'bg-white dark:bg-gray-900',
    header: 'bg-white dark:bg-gray-800'
  },

  // Text colors
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    accent: 'text-blue-600 dark:text-blue-400',
    heading: 'text-gray-900 dark:text-white'
  },

  // Borders
  border: {
    primary: 'border-gray-200 dark:border-gray-700',
    secondary: 'border-gray-300 dark:border-gray-600',
    light: 'border-gray-100 dark:border-gray-800'
  },

  // Buttons
  button: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800'
  },

  // Forms
  input: {
    base: 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-blue-400',
    checkbox: 'text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-400'
  },

  // Cards and containers
  card: {
    base: 'bg-white border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700',
    hover: 'bg-white border-gray-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-xl'
  },

  // Navigation
  nav: {
    item: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700',
    active: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
  }
};

// Helper function to get dark mode classes
export const getDarkModeClass = (category, variant = 'base') => {
  return darkModeStyles[category]?.[variant] || '';
};

// Function to combine multiple dark mode classes
export const combineDarkModeClasses = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Sidebar specific dark mode styles
export const sidebarDarkModeStyles = {
  container: 'bg-white shadow-lg border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700',
  header: 'text-blue-600 dark:text-blue-400',
  subtext: 'text-gray-500 dark:text-gray-400',
  sectionHeader: 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700',
  sectionTitle: 'text-gray-900 dark:text-white',
  filterItem: 'hover:bg-gray-50 dark:hover:bg-gray-800',
  filterLabel: 'text-gray-700 dark:text-gray-300',
  filterCount: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
  activeFilters: 'border-gray-200 dark:border-gray-700',
  clearButton: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
};

// Calendar specific dark mode styles
export const calendarDarkModeStyles = {
  container: 'bg-gray-50 dark:bg-gray-900',
  sidebar: 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700',
  header: 'border-gray-200 dark:border-gray-700',
  dateNav: 'bg-gray-50 dark:bg-gray-800',
  infoPanel: 'bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-700',
  infoText: 'text-blue-900 dark:text-blue-200',
  legendText: 'text-gray-600 dark:text-blue-300',
  employeeCard: 'border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600',
  timeSlotContainer: 'border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600',
  navButton: {
    enabled: 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-xl border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:border-gray-600',
    disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
  }
};

// Employee card dark mode styles
export const employeeCardDarkModeStyles = {
  container: 'bg-white border-gray-200 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700',
  name: 'text-gray-900 dark:text-white',
  role: 'text-gray-600 dark:text-gray-300',
  clinic: 'text-gray-500 dark:text-gray-400'
};

// Landing page dark mode styles
export const landingPageDarkModeStyles = {
  background: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800',
  card: 'bg-white dark:bg-gray-800',
  title: 'text-gray-900 dark:text-white',
  subtitle: 'text-blue-600 dark:text-blue-400',
  description: 'text-gray-600 dark:text-gray-300',
  feature: 'text-gray-700 dark:text-gray-300',
  button: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600',
  footer: 'text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700'
};

export default darkModeStyles;
