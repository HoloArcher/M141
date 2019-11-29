
const bcrypt = require('../node_modules/bcrypt');

var todos = [
  'Go to the cinema',
  'Some',
  'Watch TV',
  'Spend time with family',
  'Go out with friends',
  'Surf the internet',
  'Play video games',
  'Play a musical instrument',
  'Listen to music',
  'Read',
  'Write',
  'Go to the park',
  'Go to cultural locations and events',
  'Go shopping',
  'Cook something',
  'Study something',
  'Art and crafts',
  'Gardening',
  'Exercise and play a sport',
];

exports.seed = async function (knex) {
  await knex('todo').del()

  await knex('user').del()
  
  await knex('priority').del()
  await knex('status').del()

  await knex('priority').insert([
    { priority: 'niedrig' },
    { priority: 'normal' },
    { priority: 'hoch' },
    { priority: 'sehr hoch' },
  ])

  await knex('status').insert([
    { status: 'Nicht begonnen' },
    { status: 'in Bearbeitung' },
    { status: 'Erledigt' },
    { status: 'Wartet auf jemanden' },
    { status: 'zurückgestellt' },
  ])
  
  var testusers = [
    { givenname: 'josiah', surname: 'schiesss', password: await bcrypt.hash('admin', 10), username: 'holo' },
    { givenname: 'barack', surname: 'obama', password: await bcrypt.hash('israel', 10), username: 'obama' },
  ]

  // inserts users
  for (const user in testusers) {
    await knex('user').insert(testusers[user])
  }

  var number_todos = 4

  for (user of testusers) {
    console.log(user);
    let owner = await knex('user').select('id').where({ username: user.username });

    for (let i = 0; i < number_todos; i++) {


      await knex('todo').insert({
        text: todos[Math.floor(Math.random() * todos.length)],
        start_date: new Date(),
        end_date: new Date(),
        status_id: Math.floor(Math.random() * 5) + 1,
        priority_id: Math.floor(Math.random() * 3) + 1,
        owner_id: owner[0].id
      })

    }


  }

  console.table({ 'Todos created': number_todos, 'Users created': testusers.length, 'Total Entries Made': number_todos + testusers.length })
}
