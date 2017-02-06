package com.czx.test.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.czx.common.web.BaseController;

@Controller
@RequestMapping(value = "${adminPath}/test/")
public class TestController extends BaseController{

	@RequestMapping(value = "ajaxPage")
	public Object ajaxTestPage(){
		return "test/ajaxPage";
	}
	
}
