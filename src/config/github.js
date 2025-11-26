// GitHub repository configuration
export const GITHUB_CONFIG = {
  username: 'dfeles', // Your GitHub username
  repo: 'feels', // Repository name
  branch: 'main' // Branch name
}

// Helper function to get GitHub raw content URL
export const getGitHubImageUrl = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  // Images are in public/images/ in the repo, so prepend 'public/'
  return `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/public/${cleanPath}`
}

