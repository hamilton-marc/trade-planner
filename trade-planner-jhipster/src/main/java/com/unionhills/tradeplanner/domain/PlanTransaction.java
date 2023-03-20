package com.unionhills.tradeplanner.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.unionhills.tradeplanner.domain.enumeration.OrderStatus;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PlanTransaction.
 */
@Entity
@Table(name = "plan_transaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PlanTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "number_of_contracts")
    private Long numberOfContracts;

    @Column(name = "cost_per_contract")
    private Double costPerContract;

    @Column(name = "stop_loss")
    private Double stopLoss;

    @Column(name = "technical_stop_loss")
    private Double technicalStopLoss;

    @Column(name = "time_stop")
    private ZonedDateTime timeStop;

    @Column(name = "planned_entry_date")
    private ZonedDateTime plannedEntryDate;

    @Column(name = "planned_exit_date")
    private ZonedDateTime plannedExitDate;

    @Column(name = "entry_reason")
    private String entryReason;

    @Column(name = "exit_reason")
    private String exitReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private OrderStatus orderStatus;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private TradingPlan tradingPlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PlanTransaction id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumberOfContracts() {
        return this.numberOfContracts;
    }

    public PlanTransaction numberOfContracts(Long numberOfContracts) {
        this.setNumberOfContracts(numberOfContracts);
        return this;
    }

    public void setNumberOfContracts(Long numberOfContracts) {
        this.numberOfContracts = numberOfContracts;
    }

    public Double getCostPerContract() {
        return this.costPerContract;
    }

    public PlanTransaction costPerContract(Double costPerContract) {
        this.setCostPerContract(costPerContract);
        return this;
    }

    public void setCostPerContract(Double costPerContract) {
        this.costPerContract = costPerContract;
    }

    public Double getStopLoss() {
        return this.stopLoss;
    }

    public PlanTransaction stopLoss(Double stopLoss) {
        this.setStopLoss(stopLoss);
        return this;
    }

    public void setStopLoss(Double stopLoss) {
        this.stopLoss = stopLoss;
    }

    public Double getTechnicalStopLoss() {
        return this.technicalStopLoss;
    }

    public PlanTransaction technicalStopLoss(Double technicalStopLoss) {
        this.setTechnicalStopLoss(technicalStopLoss);
        return this;
    }

    public void setTechnicalStopLoss(Double technicalStopLoss) {
        this.technicalStopLoss = technicalStopLoss;
    }

    public ZonedDateTime getTimeStop() {
        return this.timeStop;
    }

    public PlanTransaction timeStop(ZonedDateTime timeStop) {
        this.setTimeStop(timeStop);
        return this;
    }

    public void setTimeStop(ZonedDateTime timeStop) {
        this.timeStop = timeStop;
    }

    public ZonedDateTime getPlannedEntryDate() {
        return this.plannedEntryDate;
    }

    public PlanTransaction plannedEntryDate(ZonedDateTime plannedEntryDate) {
        this.setPlannedEntryDate(plannedEntryDate);
        return this;
    }

    public void setPlannedEntryDate(ZonedDateTime plannedEntryDate) {
        this.plannedEntryDate = plannedEntryDate;
    }

    public ZonedDateTime getPlannedExitDate() {
        return this.plannedExitDate;
    }

    public PlanTransaction plannedExitDate(ZonedDateTime plannedExitDate) {
        this.setPlannedExitDate(plannedExitDate);
        return this;
    }

    public void setPlannedExitDate(ZonedDateTime plannedExitDate) {
        this.plannedExitDate = plannedExitDate;
    }

    public String getEntryReason() {
        return this.entryReason;
    }

    public PlanTransaction entryReason(String entryReason) {
        this.setEntryReason(entryReason);
        return this;
    }

    public void setEntryReason(String entryReason) {
        this.entryReason = entryReason;
    }

    public String getExitReason() {
        return this.exitReason;
    }

    public PlanTransaction exitReason(String exitReason) {
        this.setExitReason(exitReason);
        return this;
    }

    public void setExitReason(String exitReason) {
        this.exitReason = exitReason;
    }

    public OrderStatus getOrderStatus() {
        return this.orderStatus;
    }

    public PlanTransaction orderStatus(OrderStatus orderStatus) {
        this.setOrderStatus(orderStatus);
        return this;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public TradingPlan getTradingPlan() {
        return this.tradingPlan;
    }

    public void setTradingPlan(TradingPlan tradingPlan) {
        this.tradingPlan = tradingPlan;
    }

    public PlanTransaction tradingPlan(TradingPlan tradingPlan) {
        this.setTradingPlan(tradingPlan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanTransaction)) {
            return false;
        }
        return id != null && id.equals(((PlanTransaction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanTransaction{" +
            "id=" + getId() +
            ", numberOfContracts=" + getNumberOfContracts() +
            ", costPerContract=" + getCostPerContract() +
            ", stopLoss=" + getStopLoss() +
            ", technicalStopLoss=" + getTechnicalStopLoss() +
            ", timeStop='" + getTimeStop() + "'" +
            ", plannedEntryDate='" + getPlannedEntryDate() + "'" +
            ", plannedExitDate='" + getPlannedExitDate() + "'" +
            ", entryReason='" + getEntryReason() + "'" +
            ", exitReason='" + getExitReason() + "'" +
            ", orderStatus='" + getOrderStatus() + "'" +
            "}";
    }
}
