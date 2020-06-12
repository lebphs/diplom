package com.bntu.fitr.visitlog.fapi.service.Impl;

import com.bntu.fitr.visitlog.fapi.DTO.JournalDTO;
import com.bntu.fitr.visitlog.fapi.DTO.SubjectDTO;
import com.bntu.fitr.visitlog.fapi.DTO.UserDTO;
import com.bntu.fitr.visitlog.fapi.converter.DefaultConverter;
import com.bntu.fitr.visitlog.fapi.models.Journal;
import com.bntu.fitr.visitlog.fapi.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JournalServiceImpl implements JournalService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    private final String userURL = "/api/v1/journal";

    private final DefaultConverter converter;

    @Autowired
    public JournalServiceImpl(DefaultConverter converter) {
        this.converter = converter;
    }

    @Override
    public List<Journal> findJournalBySubjectId(String subjectId) {
        RestTemplate restTemplate = new RestTemplate();
        JournalDTO[] journalList = restTemplate.getForObject(backendServerUrl + userURL + "?subjectId=" + subjectId, JournalDTO[].class);
        List<JournalDTO> journalDTOList =  journalList == null ? Collections.emptyList() : Arrays.asList(journalList);
        return journalDTOList.stream().map(converter::toJournal).collect(Collectors.toList());
    }

    @Override
    public Journal createJournal(Journal journal){
        RestTemplate restTemplate = new RestTemplate();
        JournalDTO journalDTO =  restTemplate.exchange(backendServerUrl + userURL, HttpMethod.POST, new HttpEntity<>(converter.toJournalDTO(journal)), JournalDTO.class).getBody();
        return converter.toJournal(journalDTO);
    }

    @Override
    public Journal updateJournal(Journal journal){
        RestTemplate restTemplate = new RestTemplate();
        JournalDTO journalDTO =  restTemplate.exchange(backendServerUrl + userURL, HttpMethod.PUT, new HttpEntity<>(converter.toJournalDTO(journal)), JournalDTO.class).getBody();
        return converter.toJournal(journalDTO);
    }


    @Override
    public void deleteJournal(String subjectId, String date){
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + userURL + "/subject/" + subjectId + "/date/" + date);
    }
}
