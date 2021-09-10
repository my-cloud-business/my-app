//  
// Creates a Deployment Request Repoisotry Dispatch Event using the provided data
//


module.exports.validateEnvironment = function(command) {
    const commandRegex = /^(?:\/|)deploy(?: to|) ([a-zA-Z-_]+)/i;
  
    const matched = commandRegex.exec(command);
    if (!matched) {
      throw new Error(`The provided environment deployment command "${command}"; does not match the expected pattern '[/]deploy[to ] <name>'`);
    }
  
    return {
      name: matched[1].toLowerCase()
    };
  }
  
  
  module.exports.dispatch = async(payload) => {
    const environmentName = validateParameter(payload, 'environmentName'),      
      context = validateParameter(payload, 'context'),
      github = validateParameter(payload, 'github'),
      containerRegistry = validateParameter(payload, 'containerRegistry'),
      appContainerImage = validateParameter(payload, 'appContainerImage'),
      appContainerVersion = validateParameter(payload, 'appContainerVersion'),
      shortSha = payload['short_sha'],
      sha = validateParameter(payload, 'sha'),
      head = validateParameter(payload, 'head');
      
  
    // A deployment payload for passing information of the components for the deployment
    const deploymentPayload = {
      container_registry: containerRegistry,
      app_container: {
        image: appContainerImage,
        version: appContainerVersion,
      },
      sha: sha,
      short_sha: shortSha,      
      ref: context.ref,
      environment_name: environmentName,
      repository_name: context.repo.repo,
      repo: context.repo,
    };
  
    console.log('Deployment Request Payload:');
    console.log(JSON.stringify(deploymentPayload, null, 2));
  
    await github.repos.createDeployment({  
      owner: context.repo.owner,
      repo: context.repo.repo,
      environment: environmentName,
      ref: sha,
      payload: deploymentPayload,
      description: "deploying to environment " + environmentName
    });
  }
  
  // await github.repos.createDispatchEvent({  
  //   ...context.repo,
  //   event_type: 'deployment_request',
  //   client_payload: deploymentPayload
  // });
  
  function validateParameter(payload, name) {
    const value = payload[name];
  
    if (!value) {
      throw new Error(`Required Parameter '${name}' was not provided.`);
    }
    return value;
  }