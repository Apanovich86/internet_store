package program.storage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.IOUtils;
import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;
import java.util.stream.Stream;


// створюємо клас, що реалізовуватиме інтерфейс StorageService для завантаження,
// збереження та забезпечення подальшої роботи з файлами
@Service
public class FileSystemStorageService implements StorageService {

    private final Path rootLocation; // створення статичної змінної для папки, якою оперуватиме FileSystem

    @Autowired
    public FileSystemStorageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation()); //присвоєння шляху папки через конструктор
    }

    // метод ініціалізації (створює папку для берігання файлів)
    @Override
    public void init() {
        try {
            if(!Files.exists(rootLocation)) //перевірка на існування папки
            {
                Files.createDirectory(rootLocation); //якщо не існує, то ми її створюємо
            }
        } catch (IOException e) {
            throw new StorageException("Не вдалося ініціалізувати сховище", e);
        }
    }

    // метод завантаження і збереження файла з використанням інтерфейсу MultipartFile
    @Override
    public void store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException(" Не вдалося зберегти порожній файл " + file.getOriginalFilename());
            }
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (IOException e) {
            throw new StorageException(" Не вдалося зберегти файл " + file.getOriginalFilename(), e);
        }
    }

    // метод відображення усіх файлів в папці
    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(path -> this.rootLocation.relativize(path));
        } catch (IOException e) {
            throw new StorageException(" Не вдалося прочитати збережені файли ", e);
        }
    }

    // метод повернення шляху файла за його ім'ям
    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    //метод зберігання файла в форматі base64 та повернення його ім'я
    @Override
    public String storeBase64(String fileName) {
        try {
            if (fileName.isEmpty()) { //перевірка чи файл не пустий, якщо пустий - ексепшин
                throw new StorageException(" Не вдалося зберегти порожній файл ");
            }
            UUID uuid = UUID.randomUUID(); //генерування унікального імені файлу
            String randomFileName = uuid.toString()+".jpeg"; //переведення в стрінг з доданням розширення
            String [] charArray = fileName.split(","); // поділ стрінгового імені файлу на 2 частини
            java.util.Base64.Decoder decoder = Base64.getDecoder(); // збереження в декодер
            byte[] bytes = new byte[0]; // створює байт-масив
            bytes = decoder.decode(charArray[1]); //записує дані другої половини в байт-масив
            String directory= "images/"+randomFileName; //присвоєння шляху збереження файла
            new FileOutputStream(directory).write(bytes); // запис файла байтами
            return randomFileName;
        } catch (IOException e) {
            throw new StorageException("Failed to store file ", e);
        }

    }

    // метод отримання ресурсів запитуваного файлу
    @Override
    public Resource loadAsResource(String fileName) {
        try {
            Path file = load(fileName);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException("Не вдалося прочитати файл: " + fileName);

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Не вдалося прочитати файл: " + fileName, e);
        }
    }

    //метод повернення імені файлу
    @Override
    public String loadFile(String fileName) throws IOException {
        try{
            if(fileName.isEmpty()){
                throw  new StorageException(" Порожнє ім'я файлу ");
            }
            InputStream iSteamReader = new FileInputStream("./images/"+fileName);
            byte[] imageBytes = IOUtils.toByteArray(iSteamReader);
            fileName = Base64.getEncoder().encodeToString(imageBytes);

            return fileName;
        }
        catch(IOException e){
            throw new StorageException(" Не вдалося завантажити файл ", e);
        }
    }

    // метод видалення всіх файлів
    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }
    /////////////////////////////////////////////////////////////////////////////////////////

    /*// Запись изображения в jpeg-формате
    public void saveAsJpeg(String fileName) throws IOException {
        ImageWriter writer = new JPEGImageWriter(new JPEGImageWriterSpi());
        saveToImageFile(writer, fileName);
    }
    // Собственно запись файла (общая для всех форматов часть).
    private void saveToImageFile(ImageWriter iw, String fileName) throws IOException {
        iw.setOutput(new FileImageOutputStream(new File(fileName)));
        iw.write(copyToBufferedImage());
        ((FileImageOutputStream) iw.getOutput()).close();
    }

    // Формирование BufferedImage из массива pixels
    private BufferedImage copyToBufferedImage()  {
        BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        for (int i = 0; i < height; i++)
            for (int j = 0; j < width; j++)
                bi.setRGB(j, i, pixels[i*width +j]);
        return bi;
    }

    // Чтение изображения из файла в BufferedImage
    private BufferedImage readFromFile(String fileName) throws IOException {
        ImageReader r  = new JPEGImageReader(new JPEGImageReaderSpi());
        r.setInput(new FileImageInputStream(new File(fileName)));
        BufferedImage  bi = r.read(0, new ImageReadParam());
        ((FileImageInputStream) r.getInput()).close();
        return bi;
    }*/
}
