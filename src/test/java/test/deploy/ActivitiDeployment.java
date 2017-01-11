package test.deploy;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.junit.Test;

public class ActivitiDeployment {

	@Test
	public void zipDeploy(){
		
		//ªÒ»°≈‰÷√
		ProcessEngineConfiguration config = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("test/activiti.cfg.xml");
		ProcessEngine processEngine = config.buildProcessEngine();
		
	}
	
	
}
