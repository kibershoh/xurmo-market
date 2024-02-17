import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderTable = props => {
  return (
    <ContentLoader
      speed={2}
     max={500}
      height={300}
      viewBox="0 0 400 160"
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
      {...props}
    >
      <rect x="50" y="6" rx="4" ry="4" width="343" height="20" />
      <rect x="8" y="6" rx="4" ry="4" width="35" height="20" />
      <rect x="50" y="55" rx="4" ry="4" width="343" height="20" />
      <rect x="8" y="55" rx="4" ry="4" width="35" height="20" />
      <rect x="50" y="104" rx="4" ry="4" width="343" height="20" />
      <rect x="8" y="104" rx="4" ry="4" width="35" height="20" />
    </ContentLoader>
  )
}

LoaderTable.metadata = {
  name: 'Abraham Calsin',
  github: 'abrahamcalsin',
  description: 'Loading a list of tasks.',
  filename: 'LoaderTable',
}

export default LoaderTable