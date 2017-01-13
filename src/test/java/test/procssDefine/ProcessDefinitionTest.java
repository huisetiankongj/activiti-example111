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
		//��ȡ����
		//InputStream in = new FileInputStream("E:\\workspace\\activiti-example\\src\\test\\resources\\test\\deploy\\leave.zip");
		InputStream in = new FileInputStream("target\\test-classes\\test\\deploy\\leave.zip");
		ZipInputStream zipInputStream = new ZipInputStream(in);
		
		DeploymentBuilder deployBuilder = processEngine.getRepositoryService().createDeployment();
		deployBuilder.name("�������");
		deployBuilder.addZipInputStream(zipInputStream);
		Deployment deploy =deployBuilder.deploy();
		
		System.out.println("����id="+deploy.getId());
		
	}
	
	
	/**��ѯ���̶���*/
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
	
	//��������ʵ��
	@Test
	public void startProcessInstance(){
		String processDefinitionKey = "leave";
		ProcessInstance processInstance = processEngine.getRuntimeService().startProcessInstanceByKey(processDefinitionKey);
		System.out.println("����ʵ��id="+processInstance.getId());
		System.out.println("���̶���id="+processInstance.getProcessDefinitionId());
	}
	
	@Test
	public void findPersonalTask(){
		String assignee = "����";
		
		List<Task> taskList= processEngine.getTaskService()
										.createTaskQuery()
										.taskAssignee(assignee)
										.list();
		
		for(int i=0,len=taskList.size();i<len;i++){
			Task t = taskList.get(i);
			System.out.println("����ID:"+t.getId());
			System.out.println("��������:"+t.getName());
			System.out.println("����Ĵ���ʱ��:"+t.getCreateTime());
			System.out.println("����İ�����:"+t.getAssignee());
			System.out.println("����ʵ��ID��"+t.getProcessInstanceId());
			System.out.println("ִ�ж���ID:"+t.getExecutionId());
			System.out.println("���̶���ID:"+t.getProcessDefinitionId());
		}
		
	}
	
	//ִ������
	@Test
	public void completePersonalTask(){
		String taskId = "70002";
		processEngine.getTaskService()
					 .complete(taskId);
		System.out.println("�����������ID��"+taskId);
	}
	
	//�ж��Ƿ������Ƿ����
	@Test
	public void isProcessEnd(){
		String processInstanceId = "67501";
		ProcessInstance instacne = processEngine.getRuntimeService()
									 .createProcessInstanceQuery()
									 .processInstanceId(processInstanceId)
									 .singleResult();
		if(instacne==null){
			System.out.println("�����Ѿ�����");
		}else{
			System.out.println("����û�н���");
		}
		
	}
	
}
