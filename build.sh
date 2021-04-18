eval $(minikube docker-env)

if [[ -n $1 ]]
then
    echo "Building images with tag $1"
else
    echo "Please provide a tag"
    exit
fi

docker build . -t express-ts-demo:$1
docker build -f nginx/Dockerfile . -t nginx:$1