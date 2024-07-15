package com.edufocus.edufocus.video.controller;

import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import io.livekit.server.WebhookReceiver;
import livekit.LivekitWebhook.WebhookEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class Controller {

	@Value("${livekit.api.key}")
	private String LIVEKIT_API_KEY;

	@Value("${livekit.api.secret}")
	private String LIVEKIT_API_SECRET;

	/**
	 * @param params JSON object with roomName and participantName
	 * @return JSON object with the JWT token
	 */
	@PostMapping(value = "/token")
	public ResponseEntity<Map<String, String>> createToken(@RequestBody Map<String, String> params) {
		String roomName = params.get("roomName");
		String participantName = params.get("participantName");

		if (roomName == null || participantName == null) {
			return ResponseEntity.badRequest().body(Map.of("errorMessage", "roomName and participantName are required"));
		}

		AccessToken token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);


		token.setName(participantName);
		token.setIdentity(participantName);
		token.addGrants(new RoomJoin(true), new RoomName(roomName));

		// 방이름으로 입장하는건데
		// 만약 수강생에 DB에 신청한 강의명이 없다면 들어갈수 없음
		// 검증 로직만 추가하면 될듯?


		return ResponseEntity.ok(Map.of("token", token.toJwt()));
	}

		@PostMapping(value = "/webhook", consumes = "application/webhook+json")
		public ResponseEntity<String> receiveWebhook(@RequestHeader("Authorization") String authHeader, @RequestBody String body) {
			WebhookReceiver webhookReceiver = new WebhookReceiver(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
			try {
				WebhookEvent event = webhookReceiver.receive(body, authHeader);
				System.out.println("LiveKit Webhook: " + event.toString());
			} catch (Exception e) {
				System.err.println("Error validating webhook event: " + e.getMessage());
			}
			return ResponseEntity.ok("ok");
	}

}
