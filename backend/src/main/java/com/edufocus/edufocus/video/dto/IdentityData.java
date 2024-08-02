package com.edufocus.edufocus.video.dto;

public class IdentityData {
    private String name;
    private String role;

    public IdentityData(String name, String role) {
        this.name = name;
        this.role = role;
    }

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
