package test.procssDefine;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;
import java.util.zip.ZipInputStream;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.DeploymentBuilder;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.junit.Test;

public class ProcessDefinitionTest {

	private static ProcessEngineConfiguration config = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("test/activiti.cfg.xml");
	private static ProcessEngine processEngine = config.buildProcessEngine();
	
	@Test
	public void deploy() throws FileNotFoundException{
		//获取配置
		//InputStream in = new FileInputStream("E:\\workspace\\activiti-example\\src\\test\\resources\\test\\deploy\\leave.zip");
		InputStream in = new FileInputStream("target\\test-classes\\test\\deploy\\leave.zip");
		ZipInputStream zipInputStream = new ZipInputStream(in);
		
		DeploymentBuilder deployBuilder = processEngine.getRepositoryService().createDeployment();
		deployBuilder.name("请假流程");
		deployBuilder.addZipInputStream(zipInputStream);
		Deployment deploy =deployBuilder.deploy();
		
		System.out.println("部署id="+deploy.getId());
		
	}
	
	
	/**查询流程定义*/
	@Test
	public void findProcessDefinition(){
		String deploymentId = "65001";
		
		RepositoryService repositoryService = processEngine.getRepositoryService();
		
		List<ProcessDefinition> list = repositoryService
										.createProcessDefinitionQuery()
										.deploymentId(deploymentId)
										.list();
		
		for(int i=0,len=list.size();i<len;i++){
			System.out.println(list.get(i).getId());
			System.out.println(list.get(i).getResourceName());
		}
		
	}
	
	//启动流程实例
	@Test
	public void startProcessInstance(){
		String processDefinitionKey = "leave";
		ProcessInstance processInstance = processEngine.getRuntimeService().startProcessInstanceByKey(processDefinitionKey);
		System.out.println("流程实例id="+processInstance.getId());
		System.out.println("流程定义id="+processInstance.getProcessDefinitionId());
	}
	
	@Test
	public void findPersonalTask(){
		String assignee = "李四";
		
		List<Task> taskList= processEngine.getTaskService()
										.createTaskQuery()
										.taskAssignee(assignee)
										.list();
		
		for(int i=0,len=taskList.size();i<len;i++){
			Task t = taskList.get(i);
			System.out.println("任务ID:"+t.getId());
			System.out.println("任务名称:"+t.getName());
			System.out.println("任务的创建时间:"+t.getCreateTime());
			System.out.println("任务的办理人:"+t.getAssignee());
			System.out.println("流程实例ID："+t.getProcessInstanceId());
			System.out.println("执行对象ID:"+t.getExecutionId());
			System.out.println("流程定义ID:"+t.getProcessDefinitionId());
		}
		
	}
	
	//执行任务
	@Test
	public void completePersonalTask(){
		String taskId = "70002";
		processEngine.getTaskService()
					 .complete(taskId);
		System.out.println("完成任务：任务ID："+taskId);
	}
	
	//判断是否任务是否完成
	@Test
	public void isProcessEnd(){
		String processInstanceId = "67501";
		ProcessInstance instacne = processEngine.getRuntimeService()
									 .createProcessInstanceQuery()
									 .processInstanceId(processInstanceId)
									 .singleResult();
		if(instacne==null){
			System.out.println("流程已经结束");
		}else{
			System.out.println("流程没有结束");
		}
		
	}
	
}
