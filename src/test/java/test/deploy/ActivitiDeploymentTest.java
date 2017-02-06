package test.deploy;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.zip.ZipInputStream;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.repository.DeploymentBuilder;
import org.junit.Test;

public class ActivitiDeploymentTest {

	/*@Test
	public void zipDeploy() throws FileNotFoundException{
		//获取配置
		ProcessEngineConfiguration config = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("test/activiti.cfg.xml");
		ProcessEngine processEngine = config.buildProcessEngine();
		
		//InputStream in = new FileInputStream("E:\\workspace\\activiti-example\\src\\test\\resources\\test\\deploy\\leave.zip");
		InputStream in = new FileInputStream("target\\test-classes\\test\\deploy\\leave.zip");
		ZipInputStream zipInputStream = new ZipInputStream(in);
		
		DeploymentBuilder deployBuilder = processEngine.getRepositoryService().createDeployment();
		deployBuilder.name("请假流程");
		deployBuilder.addZipInputStream(zipInputStream);
		deployBuilder.deploy();
		
	}
	
	@Test
	public void inputSteamDeploy() throws FileNotFoundException{
		//获取配置
		ProcessEngineConfiguration config = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("test/activiti.cfg.xml");
		ProcessEngine processEngine = config.buildProcessEngine();
		
		DeploymentBuilder deployBuilder = processEngine.getRepositoryService().createDeployment();
		deployBuilder
			.name("请假流程")
			.addClasspathResource("test\\deploy\\leave.bpmn")
			.addClasspathResource("test\\deploy\\leave.png");
		deployBuilder.deploy();
	}*/
	
}
