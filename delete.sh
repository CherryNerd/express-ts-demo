eval $(minikube docker-env)  

kubectl delete -f ci/mongo/secret.yaml
kubectl delete -f ci/mongo/config.yaml

kubectl delete -f ci/app/deployment.yaml
kubectl delete -f ci/app/service.yaml

kubectl delete -f ci/mongo/persistentvolumeclaim.yaml
kubectl delete -f ci/mongo/deployment.yaml
kubectl delete -f ci/mongo/service.yaml

kubectl delete -f ci/nginx/deployment.yaml
kubectl delete -f ci/nginx/service.yaml