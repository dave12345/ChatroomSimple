module.exports = function Route(app){
  app.get('/', function(req, res){
    res.render('index');
  });

var users = {};
var posts = [{name: 'Upjohn', msg: 'Hey this is good chatstuff', color: 'blue'},
			{name: 'Jesse', msg: 'I like games', color: 'yellow'}, 
			{name: 'Susan', msg: 'I like stuff.', color: 'Aqua'}];

  app.io.route('got_new_user', function(req){
  	users[req.sessionID] = {name: req.data.name, color: 'Black'}
  	req.io.emit('chat_log', {posts: posts})
  })

  app.io.route('new_message', function(req, res){
  	var new_message = {name: users[req.sessionID].name, color: users[req.sessionID].color, msg: req.data.msg}
  	app.io.broadcast('add_text', new_message)
  	posts.push(new_message);
  	console.log(posts);
  })

  app.io.route('color_change', function(req, res){
  	users[req.sessionID].color = req.data.color
  	console.log(users[req.sessionID]);
  })



}//end