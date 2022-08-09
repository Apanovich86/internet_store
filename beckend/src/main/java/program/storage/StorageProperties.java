package program.storage;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

// створюємо клас для конфігурації нашого інтерфейсу StorageService
@Component
@ConfigurationProperties("storage")
@Data
public class StorageProperties {
    private String location = "images";// визначає папку для збереження файлів
}
