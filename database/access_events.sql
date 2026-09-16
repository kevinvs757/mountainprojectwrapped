CREATE TABLE access_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    profile_url VARCHAR(512) NOT NULL,
    feature ENUM('wrapped', 'heatmap') NOT NULL,
    access_method ENUM('landing', 'wrapped-link') NOT NULL,
    accessed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_profile_feature_time (profile_url, feature, accessed_at),
    INDEX idx_feature_method_time (feature, access_method, accessed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;