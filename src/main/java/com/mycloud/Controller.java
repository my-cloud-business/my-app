package com.mycloud;    

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mycloud.Widget;

@RestController
public class Controller {

	@GetMapping("/")
	public String index() {
        Widget w = new Widget();
		return "Greetings: " + w.isEnabled();
	}

}