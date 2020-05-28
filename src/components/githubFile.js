import React, { useState, useEffect } from 'react'

export default function GithubFile({
  owner = 'paramagicdev',
  repoName,
  pathToFile,
}) {
  // const [starsCount, setStarsCount] = useState(0)
  useEffect(() => {
    fetch(
      `https://api.github.com/repos/paramagicdev/${repoName}/contents/${pathToFile}`
    )
      .then(response => response.json())
      .then(data => console.log(data.content))
  }, [])
}
