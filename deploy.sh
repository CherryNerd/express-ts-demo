eval $(minikube docker-env)  

kubectl apply -f ci/mongo/secret.yaml
kubectl apply -f ci/mongo/config.yaml

kubectl apply -f ci/app/deployment.yaml
kubectl apply -f ci/app/service.yaml

kubectl apply -f ci/mongo/persistentvolumeclaim.yaml
kubectl apply -f ci/mongo/deployment.yaml
kubectl apply -f ci/mongo/service.yaml


kubectl apply -f ci/nginx/deployment.yaml
kubectl apply -f ci/nginx/service.yaml