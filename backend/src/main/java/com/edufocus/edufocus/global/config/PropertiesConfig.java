package com.edufocus.edufocus.global.config;


import com.edufocus.edufocus.global.properties.ImagePathProperties;
import com.edufocus.edufocus.global.properties.MailProperties;
import com.edufocus.edufocus.global.properties.RabbitMQProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({
        RabbitMQProperties.class,
        ImagePathProperties.class,
        MailProperties.class
})
public class PropertiesConfig {
}
