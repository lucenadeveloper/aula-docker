package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hello-world")
public class HelloWorldController {

    @PostMapping("/{name}")
    public String helloWorld(@PathVariable String name) {
        return "Hello World, ".concat(name);
    }

    @GetMapping("random-list")
    public List<String> randomList() {
        String[] names = {"Ana", "Pedro", "Maria", "João", "Carlos",
                "Fernanda", "Gabriela", "Rafael", "Juliana",
                "Gustavo", "Beatriz", "Lucas", "Mariana",
                "Felipe", "Amanda"};

        return List.of(names);
    }
}
