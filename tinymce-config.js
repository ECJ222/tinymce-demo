const mockFetchUsers = () => {
  const names = [
    'Brynn Frey',
    'Keenan Callahan',
    'Kaitlynn Hamilton',
    'Teresa Pena',
    'Jazmin Benitez',
    'Alina Beard',
    'Johanna Golden',
    'Elena Logan',
    'Amiah Dickerson',
    'Anika Mcgrath',
    'Miriam Petty',
    'Eli Chapman',
    'Bobby Santos',
    'Sloane Glover',
    'Joel Johnson',
    'Jolie Wolf',
    'Arabella Cooke',
    'Rudy Walters',
    'Noah Weeks',
    'Marisol Chen',
    'Jefferson Holland',
    'Lorelei Mccarthy',
    'Jamal Norton',
    'Gavin Acosta',
  ]

  const bio = [
    'Singer/songwriter',
    'Musician',
    'Entrepreneur',
    'Artist',
    'Actor',
    'Writer',
    'Content creator',
    'Teacher',
    'Software Engineer',
    'Business Developer',
    'Business Owner',
    'Surgeon',
    'Doctor',
    'Nurse',
    'Physicist',
    'Astronaut',
    'Astronomer',
    'Astrophysicist',
    'Crypto Billionaire',
    'Blockchain Developer',
    'Data Scientist',
    'Data Engineer',
    'Data Analyst',
    'Optimist',
  ]

  const users = names.map((name, index) => {
    return {
      id: `${index}`,
      name,
      description: bio[index],
      image: `https://xsgames.co/randomusers/assets/avatars/${
        index < 17 ? 'female' : 'male'
      }/${index}.jpg`,
    }
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(users), 300)
  })
}

const mentions_fetch = async (query, success) => {
  let users = await mockFetchUsers()
  users = users.filter((user) =>
    user.name.toLowerCase().includes(query.term.toLowerCase())
  )

  success(users)
}

const mentions_menu_hover = async (userInfo, success) => {
  const users = await mockFetchUsers()
  const userDetail = users[userInfo.id]
  const div = document.createElement('div')

  div.innerHTML =
    '<div class="card">' +
    '<img class="avatar" src="' +
    userDetail.image +
    '"/>' +
    '<h1>' +
    userDetail.name +
    '</h1>' +
    '<p>' +
    userDetail.description +
    '</p>' +
    '</div>'

  success(div)
}

const mentions_menu_complete = (editor, userInfo) => {
  const span = editor.getDoc().createElement('span')
  span.className = 'mention'
  span.setAttribute('data-mention-id', userInfo.id)
  span.appendChild(editor.getDoc().createTextNode('~' + userInfo.name))
  return span
}

const mentions_select = async (mention, success) => {
  const id = mention.getAttribute('data-mention-id')
  const users = await mockFetchUsers()
  const userDetail = users[id]

  const div = document.createElement('div')
  div.innerHTML =
    '<div class="card">' +
    '<img class="avatar" src="' +
    userDetail.image +
    '"/>' +
    '<h1>' +
    userDetail.name +
    '</h1>' +
    '<p>' +
    userDetail.description +
    '</p>' +
    '</div>'
    
  success(div)
}

tinymce.init({
  selector: 'textarea',
  plugins: 'mentions',
  mentions_min_chars: 0,
  mentions_item_type: 'profile',
  mentions_menu_hover: mentions_menu_hover,
  mentions_fetch: mentions_fetch,
  mentions_selector: 'span.mention',
  mentions_menu_complete: mentions_menu_complete,
  mentions_select: mentions_select,
})
