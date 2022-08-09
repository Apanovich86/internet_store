package program.entities;

import javax.persistence.*;

@Entity
@Table(name="tbl_sizes")
public class SizeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ESizeEntity name;
    public SizeEntity() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ESizeEntity getName() {
        return name;
    }

    public void setName(ESizeEntity name) {
        this.name = name;
    }
}
