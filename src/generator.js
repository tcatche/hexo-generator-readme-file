let config = {
  groupType: 'month',
  sort: 'desc',
}

function getMetaData (posts) {
  const { groupType, sort } = config
  const result = {}
  posts.sort((a, b) => {
    if (sort === 'asc') {
      return a.date - b.date
    }
    return b.date - a.date
  }).forEach(post => {
    const { title, permalink, date } = post
    let label = date.format(groupType === 'year' ? 'YYYY' : 'YYYY-MM')
    if (groupType === 'none') {
      label = 'none'
    }
    if (!result[label]) result[label] = []
    result[label].push({
      title,
      permalink,
      label,
      date: date.format('YYYY-MM-DD')
    })
  })
  return result
}

function formatData (posts) {
  const data = getMetaData(posts)
  const result = []
  if (config.postsHeader) {
    result.push(config.postsHeader)
  }
  Object.keys(data).forEach(label => {
    if (config.groupType !== 'none') {
      result.push(`### **${label}** (${data[label].length})`)
    }
    data[label].forEach(item => {
      result.push(`- ${item.date} [${item.title}](${item.permalink})`)
    })
    result.push(`  \n`)
  })
  return result.join('  \n')
}

const generator = function (hexo, locals) {
  config = {
    ...config,
    ...(hexo.config.readmeConfig || {}),
  }
  return {
    path: 'README.md',
    data: formatData(locals.posts.data),
  }
}

module.exports = generator
