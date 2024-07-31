package com.edufocus.edufocus.global.config;


import com.edufocus.edufocus.global.properties.RabbitMQProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({
        RabbitMQProperties.class
})
public class PropertiesConfig {
}
