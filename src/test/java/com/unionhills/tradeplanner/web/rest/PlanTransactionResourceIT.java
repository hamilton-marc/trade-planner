package com.unionhills.tradeplanner.web.rest;

import static com.unionhills.tradeplanner.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.unionhills.tradeplanner.IntegrationTest;
import com.unionhills.tradeplanner.domain.PlanTransaction;
import com.unionhills.tradeplanner.domain.enumeration.OrderStatus;
import com.unionhills.tradeplanner.repository.PlanTransactionRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PlanTransactionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlanTransactionResourceIT {

    private static final Long DEFAULT_NUMBER_OF_CONTRACTS = 1L;
    private static final Long UPDATED_NUMBER_OF_CONTRACTS = 2L;

    private static final Double DEFAULT_COST_PER_CONTRACT = 1D;
    private static final Double UPDATED_COST_PER_CONTRACT = 2D;

    private static final Double DEFAULT_STOP_LOSS = 1D;
    private static final Double UPDATED_STOP_LOSS = 2D;

    private static final Double DEFAULT_TECHNICAL_STOP_LOSS = 1D;
    private static final Double UPDATED_TECHNICAL_STOP_LOSS = 2D;

    private static final ZonedDateTime DEFAULT_TIME_STOP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_STOP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PLANNED_ENTRY_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PLANNED_ENTRY_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PLANNED_EXIT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PLANNED_EXIT_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_ENTRY_REASON = "AAAAAAAAAA";
    private static final String UPDATED_ENTRY_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_EXIT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_EXIT_REASON = "BBBBBBBBBB";

    private static final OrderStatus DEFAULT_ORDER_STATUS = OrderStatus.Planned;
    private static final OrderStatus UPDATED_ORDER_STATUS = OrderStatus.Submitted;

    private static final String ENTITY_API_URL = "/api/plan-transactions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PlanTransactionRepository planTransactionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanTransactionMockMvc;

    private PlanTransaction planTransaction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanTransaction createEntity(EntityManager em) {
        PlanTransaction planTransaction = new PlanTransaction()
            .numberOfContracts(DEFAULT_NUMBER_OF_CONTRACTS)
            .costPerContract(DEFAULT_COST_PER_CONTRACT)
            .stopLoss(DEFAULT_STOP_LOSS)
            .technicalStopLoss(DEFAULT_TECHNICAL_STOP_LOSS)
            .timeStop(DEFAULT_TIME_STOP)
            .plannedEntryDate(DEFAULT_PLANNED_ENTRY_DATE)
            .plannedExitDate(DEFAULT_PLANNED_EXIT_DATE)
            .entryReason(DEFAULT_ENTRY_REASON)
            .exitReason(DEFAULT_EXIT_REASON)
            .orderStatus(DEFAULT_ORDER_STATUS);
        return planTransaction;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanTransaction createUpdatedEntity(EntityManager em) {
        PlanTransaction planTransaction = new PlanTransaction()
            .numberOfContracts(UPDATED_NUMBER_OF_CONTRACTS)
            .costPerContract(UPDATED_COST_PER_CONTRACT)
            .stopLoss(UPDATED_STOP_LOSS)
            .technicalStopLoss(UPDATED_TECHNICAL_STOP_LOSS)
            .timeStop(UPDATED_TIME_STOP)
            .plannedEntryDate(UPDATED_PLANNED_ENTRY_DATE)
            .plannedExitDate(UPDATED_PLANNED_EXIT_DATE)
            .entryReason(UPDATED_ENTRY_REASON)
            .exitReason(UPDATED_EXIT_REASON)
            .orderStatus(UPDATED_ORDER_STATUS);
        return planTransaction;
    }

    @BeforeEach
    public void initTest() {
        planTransaction = createEntity(em);
    }

    @Test
    @Transactional
    void createPlanTransaction() throws Exception {
        int databaseSizeBeforeCreate = planTransactionRepository.findAll().size();
        // Create the PlanTransaction
        restPlanTransactionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planTransaction))
            )
            .andExpect(status().isCreated());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        PlanTransaction testPlanTransaction = planTransactionList.get(planTransactionList.size() - 1);
        assertThat(testPlanTransaction.getNumberOfContracts()).isEqualTo(DEFAULT_NUMBER_OF_CONTRACTS);
        assertThat(testPlanTransaction.getCostPerContract()).isEqualTo(DEFAULT_COST_PER_CONTRACT);
        assertThat(testPlanTransaction.getStopLoss()).isEqualTo(DEFAULT_STOP_LOSS);
        assertThat(testPlanTransaction.getTechnicalStopLoss()).isEqualTo(DEFAULT_TECHNICAL_STOP_LOSS);
        assertThat(testPlanTransaction.getTimeStop()).isEqualTo(DEFAULT_TIME_STOP);
        assertThat(testPlanTransaction.getPlannedEntryDate()).isEqualTo(DEFAULT_PLANNED_ENTRY_DATE);
        assertThat(testPlanTransaction.getPlannedExitDate()).isEqualTo(DEFAULT_PLANNED_EXIT_DATE);
        assertThat(testPlanTransaction.getEntryReason()).isEqualTo(DEFAULT_ENTRY_REASON);
        assertThat(testPlanTransaction.getExitReason()).isEqualTo(DEFAULT_EXIT_REASON);
        assertThat(testPlanTransaction.getOrderStatus()).isEqualTo(DEFAULT_ORDER_STATUS);
    }

    @Test
    @Transactional
    void createPlanTransactionWithExistingId() throws Exception {
        // Create the PlanTransaction with an existing ID
        planTransaction.setId(1L);

        int databaseSizeBeforeCreate = planTransactionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanTransactionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPlanTransactions() throws Exception {
        // Initialize the database
        planTransactionRepository.saveAndFlush(planTransaction);

        // Get all the planTransactionList
        restPlanTransactionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].numberOfContracts").value(hasItem(DEFAULT_NUMBER_OF_CONTRACTS.intValue())))
            .andExpect(jsonPath("$.[*].costPerContract").value(hasItem(DEFAULT_COST_PER_CONTRACT.doubleValue())))
            .andExpect(jsonPath("$.[*].stopLoss").value(hasItem(DEFAULT_STOP_LOSS.doubleValue())))
            .andExpect(jsonPath("$.[*].technicalStopLoss").value(hasItem(DEFAULT_TECHNICAL_STOP_LOSS.doubleValue())))
            .andExpect(jsonPath("$.[*].timeStop").value(hasItem(sameInstant(DEFAULT_TIME_STOP))))
            .andExpect(jsonPath("$.[*].plannedEntryDate").value(hasItem(sameInstant(DEFAULT_PLANNED_ENTRY_DATE))))
            .andExpect(jsonPath("$.[*].plannedExitDate").value(hasItem(sameInstant(DEFAULT_PLANNED_EXIT_DATE))))
            .andExpect(jsonPath("$.[*].entryReason").value(hasItem(DEFAULT_ENTRY_REASON)))
            .andExpect(jsonPath("$.[*].exitReason").value(hasItem(DEFAULT_EXIT_REASON)))
            .andExpect(jsonPath("$.[*].orderStatus").value(hasItem(DEFAULT_ORDER_STATUS.toString())));
    }

    @Test
    @Transactional
    void getPlanTransaction() throws Exception {
        // Initialize the database
        planTransactionRepository.saveAndFlush(planTransaction);

        // Get the planTransaction
        restPlanTransactionMockMvc
            .perform(get(ENTITY_API_URL_ID, planTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planTransaction.getId().intValue()))
            .andExpect(jsonPath("$.numberOfContracts").value(DEFAULT_NUMBER_OF_CONTRACTS.intValue()))
            .andExpect(jsonPath("$.costPerContract").value(DEFAULT_COST_PER_CONTRACT.doubleValue()))
            .andExpect(jsonPath("$.stopLoss").value(DEFAULT_STOP_LOSS.doubleValue()))
            .andExpect(jsonPath("$.technicalStopLoss").value(DEFAULT_TECHNICAL_STOP_LOSS.doubleValue()))
            .andExpect(jsonPath("$.timeStop").value(sameInstant(DEFAULT_TIME_STOP)))
            .andExpect(jsonPath("$.plannedEntryDate").value(sameInstant(DEFAULT_PLANNED_ENTRY_DATE)))
            .andExpect(jsonPath("$.plannedExitDate").value(sameInstant(DEFAULT_PLANNED_EXIT_DATE)))
            .andExpect(jsonPath("$.entryReason").value(DEFAULT_ENTRY_REASON))
            .andExpect(jsonPath("$.exitReason").value(DEFAULT_EXIT_REASON))
            .andExpect(jsonPath("$.orderStatus").value(DEFAULT_ORDER_STATUS.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPlanTransaction() throws Exception {
        // Get the planTransaction
        restPlanTransactionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPlanTransaction() throws Exception {
        // Initialize the database
        planTransactionRepository.saveAndFlush(planTransaction);

        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();

        // Update the planTransaction
        PlanTransaction updatedPlanTransaction = planTransactionRepository.findById(planTransaction.getId()).get();
        // Disconnect from session so that the updates on updatedPlanTransaction are not directly saved in db
        em.detach(updatedPlanTransaction);
        updatedPlanTransaction
            .numberOfContracts(UPDATED_NUMBER_OF_CONTRACTS)
            .costPerContract(UPDATED_COST_PER_CONTRACT)
            .stopLoss(UPDATED_STOP_LOSS)
            .technicalStopLoss(UPDATED_TECHNICAL_STOP_LOSS)
            .timeStop(UPDATED_TIME_STOP)
            .plannedEntryDate(UPDATED_PLANNED_ENTRY_DATE)
            .plannedExitDate(UPDATED_PLANNED_EXIT_DATE)
            .entryReason(UPDATED_ENTRY_REASON)
            .exitReason(UPDATED_EXIT_REASON)
            .orderStatus(UPDATED_ORDER_STATUS);

        restPlanTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPlanTransaction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPlanTransaction))
            )
            .andExpect(status().isOk());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
        PlanTransaction testPlanTransaction = planTransactionList.get(planTransactionList.size() - 1);
        assertThat(testPlanTransaction.getNumberOfContracts()).isEqualTo(UPDATED_NUMBER_OF_CONTRACTS);
        assertThat(testPlanTransaction.getCostPerContract()).isEqualTo(UPDATED_COST_PER_CONTRACT);
        assertThat(testPlanTransaction.getStopLoss()).isEqualTo(UPDATED_STOP_LOSS);
        assertThat(testPlanTransaction.getTechnicalStopLoss()).isEqualTo(UPDATED_TECHNICAL_STOP_LOSS);
        assertThat(testPlanTransaction.getTimeStop()).isEqualTo(UPDATED_TIME_STOP);
        assertThat(testPlanTransaction.getPlannedEntryDate()).isEqualTo(UPDATED_PLANNED_ENTRY_DATE);
        assertThat(testPlanTransaction.getPlannedExitDate()).isEqualTo(UPDATED_PLANNED_EXIT_DATE);
        assertThat(testPlanTransaction.getEntryReason()).isEqualTo(UPDATED_ENTRY_REASON);
        assertThat(testPlanTransaction.getExitReason()).isEqualTo(UPDATED_EXIT_REASON);
        assertThat(testPlanTransaction.getOrderStatus()).isEqualTo(UPDATED_ORDER_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingPlanTransaction() throws Exception {
        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();
        planTransaction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, planTransaction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(planTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPlanTransaction() throws Exception {
        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();
        planTransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(planTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPlanTransaction() throws Exception {
        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();
        planTransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanTransactionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planTransaction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePlanTransactionWithPatch() throws Exception {
        // Initialize the database
        planTransactionRepository.saveAndFlush(planTransaction);

        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();

        // Update the planTransaction using partial update
        PlanTransaction partialUpdatedPlanTransaction = new PlanTransaction();
        partialUpdatedPlanTransaction.setId(planTransaction.getId());

        partialUpdatedPlanTransaction
            .timeStop(UPDATED_TIME_STOP)
            .plannedEntryDate(UPDATED_PLANNED_ENTRY_DATE)
            .plannedExitDate(UPDATED_PLANNED_EXIT_DATE)
            .orderStatus(UPDATED_ORDER_STATUS);

        restPlanTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanTransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlanTransaction))
            )
            .andExpect(status().isOk());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
        PlanTransaction testPlanTransaction = planTransactionList.get(planTransactionList.size() - 1);
        assertThat(testPlanTransaction.getNumberOfContracts()).isEqualTo(DEFAULT_NUMBER_OF_CONTRACTS);
        assertThat(testPlanTransaction.getCostPerContract()).isEqualTo(DEFAULT_COST_PER_CONTRACT);
        assertThat(testPlanTransaction.getStopLoss()).isEqualTo(DEFAULT_STOP_LOSS);
        assertThat(testPlanTransaction.getTechnicalStopLoss()).isEqualTo(DEFAULT_TECHNICAL_STOP_LOSS);
        assertThat(testPlanTransaction.getTimeStop()).isEqualTo(UPDATED_TIME_STOP);
        assertThat(testPlanTransaction.getPlannedEntryDate()).isEqualTo(UPDATED_PLANNED_ENTRY_DATE);
        assertThat(testPlanTransaction.getPlannedExitDate()).isEqualTo(UPDATED_PLANNED_EXIT_DATE);
        assertThat(testPlanTransaction.getEntryReason()).isEqualTo(DEFAULT_ENTRY_REASON);
        assertThat(testPlanTransaction.getExitReason()).isEqualTo(DEFAULT_EXIT_REASON);
        assertThat(testPlanTransaction.getOrderStatus()).isEqualTo(UPDATED_ORDER_STATUS);
    }

    @Test
    @Transactional
    void fullUpdatePlanTransactionWithPatch() throws Exception {
        // Initialize the database
        planTransactionRepository.saveAndFlush(planTransaction);

        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();

        // Update the planTransaction using partial update
        PlanTransaction partialUpdatedPlanTransaction = new PlanTransaction();
        partialUpdatedPlanTransaction.setId(planTransaction.getId());

        partialUpdatedPlanTransaction
            .numberOfContracts(UPDATED_NUMBER_OF_CONTRACTS)
            .costPerContract(UPDATED_COST_PER_CONTRACT)
            .stopLoss(UPDATED_STOP_LOSS)
            .technicalStopLoss(UPDATED_TECHNICAL_STOP_LOSS)
            .timeStop(UPDATED_TIME_STOP)
            .plannedEntryDate(UPDATED_PLANNED_ENTRY_DATE)
            .plannedExitDate(UPDATED_PLANNED_EXIT_DATE)
            .entryReason(UPDATED_ENTRY_REASON)
            .exitReason(UPDATED_EXIT_REASON)
            .orderStatus(UPDATED_ORDER_STATUS);

        restPlanTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanTransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlanTransaction))
            )
            .andExpect(status().isOk());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
        PlanTransaction testPlanTransaction = planTransactionList.get(planTransactionList.size() - 1);
        assertThat(testPlanTransaction.getNumberOfContracts()).isEqualTo(UPDATED_NUMBER_OF_CONTRACTS);
        assertThat(testPlanTransaction.getCostPerContract()).isEqualTo(UPDATED_COST_PER_CONTRACT);
        assertThat(testPlanTransaction.getStopLoss()).isEqualTo(UPDATED_STOP_LOSS);
        assertThat(testPlanTransaction.getTechnicalStopLoss()).isEqualTo(UPDATED_TECHNICAL_STOP_LOSS);
        assertThat(testPlanTransaction.getTimeStop()).isEqualTo(UPDATED_TIME_STOP);
        assertThat(testPlanTransaction.getPlannedEntryDate()).isEqualTo(UPDATED_PLANNED_ENTRY_DATE);
        assertThat(testPlanTransaction.getPlannedExitDate()).isEqualTo(UPDATED_PLANNED_EXIT_DATE);
        assertThat(testPlanTransaction.getEntryReason()).isEqualTo(UPDATED_ENTRY_REASON);
        assertThat(testPlanTransaction.getExitReason()).isEqualTo(UPDATED_EXIT_REASON);
        assertThat(testPlanTransaction.getOrderStatus()).isEqualTo(UPDATED_ORDER_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingPlanTransaction() throws Exception {
        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();
        planTransaction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, planTransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPlanTransaction() throws Exception {
        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();
        planTransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPlanTransaction() throws Exception {
        int databaseSizeBeforeUpdate = planTransactionRepository.findAll().size();
        planTransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planTransaction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanTransaction in the database
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePlanTransaction() throws Exception {
        // Initialize the database
        planTransactionRepository.saveAndFlush(planTransaction);

        int databaseSizeBeforeDelete = planTransactionRepository.findAll().size();

        // Delete the planTransaction
        restPlanTransactionMockMvc
            .perform(delete(ENTITY_API_URL_ID, planTransaction.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlanTransaction> planTransactionList = planTransactionRepository.findAll();
        assertThat(planTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
