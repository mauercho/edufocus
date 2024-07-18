package com.edufocus.edufocus.user.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

import com.edufocus.edufocus.user.model.exception.UnAuthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JWTUtil {

    @Value("${jwt.salt}")
    private String salt;

    @Value("${jwt.access-token.expiretime}")
    private long accessTokenExpireTime;

    @Value("${jwt.refresh-token.expiretime}")
    private long refreshTokenExpireTime;

    public String createAccessToken(String id) {
        return create(id, "access-token", accessTokenExpireTime);
    }

    public String createRefreshToken(String id) {
        return create(id, "refresh-token", refreshTokenExpireTime);
    }

    private String create(String id, String subject, long expireTime) {
        Claims claims = Jwts.claims()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expireTime));
        claims.put("id", id);

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();
    }

    private byte[] generateKey() {
        return salt.getBytes(StandardCharsets.UTF_8);
    }

    public boolean checkToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(generateKey())
                    .build()
                    .parseClaimsJws(token);
            log.debug("claims: {}", claims);
            return true;
        } catch (Exception e) {
            log.error("Token validation error: {}", e.getMessage());
            return false;
        }
    }

    public String getUserId(String authorization) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(generateKey())
                    .build()
                    .parseClaimsJws(authorization);
            Map<String, Object> value = claims.getBody();
            log.info("value : {}", value);
            return (String) value.get("id");
        } catch (Exception e) {
            log.error("Failed to get user ID from token: {}", e.getMessage());
            throw new UnAuthorizedException();
        }
    }
}
