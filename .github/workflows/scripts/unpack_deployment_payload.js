class DeploymentPayload { 

    constructor(context, core, github) {
      this.context = context;
      this.core = core;
      this.github = github;
    }
  
    // Unpacks the deployment payload and sets them as outputs then reports a deployment status
    async extractDeploymentDetails() {
      const context = this.context
        , core = this.core
        , deploymentPayload = context.payload.deployment.payload
        ;
  
      console.log("context = " + JSON.stringify(context));
      console.log("core = " + JSON.stringify(core));
      console.log("github = " + JSON.stringify(this.github));
  
      const deployment = {
        app_container_image: deploymentPayload.app_container.image,
        app_container_version: deploymentPayload.app_container.version,
    
        deployment_sha: deploymentPayload.sha,
        deployment_github_ref: deploymentPayload.ref,
          
        environment_name: deploymentPayload.environment_name,
    
        container_registry: deploymentPayload.container_registry,
        namespace: `${deploymentPayload.repository_name.toLowerCase().replace(/_/g, '-')}`,
      };
  
      console.log('Deployment Request Payload:');
      console.log(JSON.stringify(deployment, null, 2));
  
      Object.keys(deployment).forEach(key => {
        core.setOutput(key, deployment[key]);
      });
    }
  }
  
  module.exports = (context, core, github) => {
    return new DeploymentPayload(context, core, github);
  }
