package com.edufocus.edufocus.global.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RabbitMQConstant {

    CHAT_QUEUE_NAME("chat.queue"),
    CHAT_EXCHANGE("chat.exchange"),
    ROUTING_KEY("*.room.*"),
    ROUTING_KEY_PREFIX("*.room.");;
    private final String constant;
}
