const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters.',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'User is Authorized.',
  };

  if (!params.valid || params.valid !== 'yes') {
    responseJSON.message = 'Missing valid query parameter set to yes.';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'User is forbidden from seeing this page.',
  };
  return respondJSON(request, response, 403, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'Feature has not been implemented.',
  };
  return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = { users };

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const addUser = (request, response, body) => {
	const responseJSON = {message: 'Name and age are both required.',};
	
	if(!body.name || !body.age){
		responseJSON.id = 'missingParams';
		return respondJSON (request, response, 400, responseJSON);
	}
	
	let responseCode = 201;
	
	if(users[body.name]){
		responseCode = 204;
	} else {
		users[body.name] = {};
	}
	
	users[body.name].name = body.name;
	users[body.name].age = body.age;
	
	if(responseCode === 201){
		responseJSON.message = 'Created Successfully';
		return respondJSON(request, response, responseCode, responseJSON)
	}
	
	return respondJSONMeta(request, response, responseCode);
};


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notImplemented,
  notFound,
  getUsers,
  getUsersMeta,
  addUser,
};
