package com.unionhills.tradeplanner.web.rest;

import com.unionhills.tradeplanner.domain.PlanTransaction;
import com.unionhills.tradeplanner.repository.PlanTransactionRepository;
import com.unionhills.tradeplanner.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.unionhills.tradeplanner.domain.PlanTransaction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlanTransactionResource {

    private final Logger log = LoggerFactory.getLogger(PlanTransactionResource.class);

    private static final String ENTITY_NAME = "planTransaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanTransactionRepository planTransactionRepository;

    public PlanTransactionResource(PlanTransactionRepository planTransactionRepository) {
        this.planTransactionRepository = planTransactionRepository;
    }

    /**
     * {@code POST  /plan-transactions} : Create a new planTransaction.
     *
     * @param planTransaction the planTransaction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planTransaction, or with status {@code 400 (Bad Request)} if the planTransaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plan-transactions")
    public ResponseEntity<PlanTransaction> createPlanTransaction(@RequestBody PlanTransaction planTransaction) throws URISyntaxException {
        log.debug("REST request to save PlanTransaction : {}", planTransaction);
        if (planTransaction.getId() != null) {
            throw new BadRequestAlertException("A new planTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanTransaction result = planTransactionRepository.save(planTransaction);
        return ResponseEntity
            .created(new URI("/api/plan-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plan-transactions/:id} : Updates an existing planTransaction.
     *
     * @param id the id of the planTransaction to save.
     * @param planTransaction the planTransaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planTransaction,
     * or with status {@code 400 (Bad Request)} if the planTransaction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planTransaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plan-transactions/{id}")
    public ResponseEntity<PlanTransaction> updatePlanTransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlanTransaction planTransaction
    ) throws URISyntaxException {
        log.debug("REST request to update PlanTransaction : {}, {}", id, planTransaction);
        if (planTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planTransaction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planTransactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PlanTransaction result = planTransactionRepository.save(planTransaction);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planTransaction.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /plan-transactions/:id} : Partial updates given fields of an existing planTransaction, field will ignore if it is null
     *
     * @param id the id of the planTransaction to save.
     * @param planTransaction the planTransaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planTransaction,
     * or with status {@code 400 (Bad Request)} if the planTransaction is not valid,
     * or with status {@code 404 (Not Found)} if the planTransaction is not found,
     * or with status {@code 500 (Internal Server Error)} if the planTransaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/plan-transactions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PlanTransaction> partialUpdatePlanTransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlanTransaction planTransaction
    ) throws URISyntaxException {
        log.debug("REST request to partial update PlanTransaction partially : {}, {}", id, planTransaction);
        if (planTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planTransaction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planTransactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PlanTransaction> result = planTransactionRepository
            .findById(planTransaction.getId())
            .map(existingPlanTransaction -> {
                if (planTransaction.getNumberOfContracts() != null) {
                    existingPlanTransaction.setNumberOfContracts(planTransaction.getNumberOfContracts());
                }
                if (planTransaction.getCostPerContract() != null) {
                    existingPlanTransaction.setCostPerContract(planTransaction.getCostPerContract());
                }
                if (planTransaction.getStopLoss() != null) {
                    existingPlanTransaction.setStopLoss(planTransaction.getStopLoss());
                }
                if (planTransaction.getTechnicalStopLoss() != null) {
                    existingPlanTransaction.setTechnicalStopLoss(planTransaction.getTechnicalStopLoss());
                }
                if (planTransaction.getTimeStop() != null) {
                    existingPlanTransaction.setTimeStop(planTransaction.getTimeStop());
                }
                if (planTransaction.getPlannedEntryDate() != null) {
                    existingPlanTransaction.setPlannedEntryDate(planTransaction.getPlannedEntryDate());
                }
                if (planTransaction.getPlannedExitDate() != null) {
                    existingPlanTransaction.setPlannedExitDate(planTransaction.getPlannedExitDate());
                }
                if (planTransaction.getEntryReason() != null) {
                    existingPlanTransaction.setEntryReason(planTransaction.getEntryReason());
                }
                if (planTransaction.getExitReason() != null) {
                    existingPlanTransaction.setExitReason(planTransaction.getExitReason());
                }
                if (planTransaction.getOrderStatus() != null) {
                    existingPlanTransaction.setOrderStatus(planTransaction.getOrderStatus());
                }

                return existingPlanTransaction;
            })
            .map(planTransactionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planTransaction.getId().toString())
        );
    }

    /**
     * {@code GET  /plan-transactions} : get all the planTransactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planTransactions in body.
     */
    @GetMapping("/plan-transactions")
    public List<PlanTransaction> getAllPlanTransactions() {
        log.debug("REST request to get all PlanTransactions");
        return planTransactionRepository.findAll();
    }

    /**
     * {@code GET  /plan-transactions/:id} : get the "id" planTransaction.
     *
     * @param id the id of the planTransaction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planTransaction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plan-transactions/{id}")
    public ResponseEntity<PlanTransaction> getPlanTransaction(@PathVariable Long id) {
        log.debug("REST request to get PlanTransaction : {}", id);
        Optional<PlanTransaction> planTransaction = planTransactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planTransaction);
    }

    /**
     * {@code DELETE  /plan-transactions/:id} : delete the "id" planTransaction.
     *
     * @param id the id of the planTransaction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plan-transactions/{id}")
    public ResponseEntity<Void> deletePlanTransaction(@PathVariable Long id) {
        log.debug("REST request to delete PlanTransaction : {}", id);
        planTransactionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
