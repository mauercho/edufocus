package com.edufocus.edufocus.global.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "spring.mail")
public class MailProperties {
    private final String host;
    private final Integer port;
    private final String name;
    private final String password;
}
