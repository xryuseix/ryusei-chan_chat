curl http://localhost:3000/api/hello
curl -X POST http://localhost:3000/api/hello2
curl -N -X POST -H "Content-Type: application/json" -d '{"message":"Hello, world!とはどういう意味で すか？"}' http://localhost:3000/api/chat