package program.entities;



import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name="tbl_users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message="Поле 'Ім'я' не може бути пустим")
    @Size(min=2, max=20, message="Поле 'Ім'я' повинне містити не менше двох символів")
    @Column(name="username",length = 200, nullable = false)
    private String username;

    @NotNull(message="Поле 'Ім'я' не може бути пустим")
    @Size(min=2, message="Поле 'Ім'я' повинне містити не менше двох символів")
    @Column(name="name",length = 200, nullable = false)
    private String name;

    @NotNull(message="Поле 'Прізвище' не може бути пустим")
    @Size(min=2, message="Поле 'Прізвище' повинне містити не менше двох символів")
    @Column(name="surname",length = 200, nullable = false)
    private String surname;

    @NotNull(message="Поле 'Номер телефону' не може бути пустим")

    @Column(name="phone",length = 20, nullable = false)
    private String phone;

    @NotNull(message="Поле 'Електронна адреса' не може бути пустим")
   @Email(message="Будь ласка, надайте дійсну адресу електронної пошти")
    @Column(name="email",length = 200, nullable = false)
    private String email;

    @NotNull(message="Пароль є обов’язковим для заповнення")
    //@Size(min=8, message="Пароль має містити від 8 та не більше 16 символів")
    @Column(name="password",columnDefinition="text", nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResponseEntity> responses=new ArrayList<>();

    public UserEntity() {
    }
    public UserEntity(String username, String name, String surname, String phone, String email, String password) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    public UserEntity(List<ResponseEntity> responses) {
        this.responses = responses;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
