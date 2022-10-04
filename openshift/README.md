# Getting Started

You will need to clone the this repo and checkout the docker branch. Then modify the resources in the openshift directory with your project namespace, and modify the route with your clusters domain. When building the docker image tag it with your container registry that is used by openshift.

```
git clone https://github.com/mjj203/fresco-docker.git
cd fresco-docker
git checkout docker
docker login $registry
docker build -t $registry/fresco:latest -f Dockerfile .
docker push $registry/fresco:latest
oc login
oc apply -f openshift/fresco-deployment.yaml
oc apply -f openshift/fresco-service.yaml
oc apply -f openshift/fresco-route.yaml
```
