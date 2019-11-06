/**
 *  Copyright 2016-2019 the original author or authors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.antheminc.oss.nimbus.app.extension.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.activiti.engine.impl.persistence.deploy.DefaultDeploymentCache;
import org.activiti.engine.impl.persistence.deploy.ProcessDefinitionCacheEntry;

import com.antheminc.oss.nimbus.support.JustLogit;

/**
 * @author Jayant Chaudhuri
 *
 */
public class ActivitiProcessDefinitionCache extends DefaultDeploymentCache<ProcessDefinitionCacheEntry> {
	
	private Map<String,ProcessDefinitionCacheEntry> processDefinitionCache = new ConcurrentHashMap<String,ProcessDefinitionCacheEntry>();
	
	protected final JustLogit logit = new JustLogit(ActivitiProcessDefinitionCache.class);

	public ProcessDefinitionCacheEntry findByKey(String currentKey) {
		ProcessDefinitionCacheEntry entry = processDefinitionCache.get(currentKey);
		if(entry != null)
			return entry;
		int version = 0;
		for(ProcessDefinitionCacheEntry processDefinitionEntry:cache.values()) {
			String key = processDefinitionEntry.getProcess().getId();
			if(key.equals(currentKey)) {
				if(processDefinitionEntry.getProcessDefinition().getVersion() > version) {
					entry = processDefinitionEntry;
					version = processDefinitionEntry.getProcessDefinition().getVersion();
				}
			}
		}
		processDefinitionCache.put(currentKey, entry);
		return entry;
	}
	
	@Override
	public void add(String id, ProcessDefinitionCacheEntry obj) {
		super.add(id, obj);
	}
	

}
